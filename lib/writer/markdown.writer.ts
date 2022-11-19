import { AbstractWriter } from '../common/abstract.writer';
import {
  ColumnsExecutor,
  ColumnsRowData,
  IndexdExecutor,
  IndexdRowData,
  TablesExecutor,
  TablesRowData,
} from '../executor';
import {
  colTitles,
  colKeys,
  indexdKeys,
  indexdTitles,
} from '../constants/table';

export class MarkdownWriter extends AbstractWriter {
  async write(): Promise<void> {
    console.log('\nLooking for all tables in the database:');
    const tables = await new TablesExecutor(
      this.database,
    ).exec<TablesRowData>();
    console.table(tables);

    // title
    await this.writeTitle(
      `${this.database}数据库文档`,
      1,
      false,
      '<a name="返回顶部"></a>',
    );

    // outline
    await this.writeOutline(tables);

    // tables
    for (let i = 0; i < tables.length; i++) {
      await this.writeTitle(
        `${tables[i].name}[↑](#返回顶部)<a name="${tables[i].name}"></a>`,
        2,
        true,
        tables[i].comment ? `> 表注释: ${tables[i].comment}` : undefined,
      );

      await this.writeTable(tables[i]);
    }
  }

  private async writeTitle(
    title: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    newLine = false,
    subTitle?: string,
  ) {
    const text: string[] = [];

    if (newLine) {
      text.push('');
    }

    text.push(...[`${'#'.repeat(level)} ${title}`, '']);

    if (subTitle) {
      text.push(...[subTitle, '']);
    }

    text.push('');

    this.stream.write(text.join('\n'));
  }

  private async writeOutline(tables: TablesRowData[]) {
    const outline: string[] = [];

    tables.forEach((e) => {
      const title = `* [${e.name}](#${e.name})`;

      outline.push(...[title, '']);
    });

    this.stream.write([...outline].join('\n'));
  }

  private async writeTable(table: TablesRowData) {
    const text: string[] = [];

    // columns
    const columns = await new ColumnsExecutor(
      this.database,
      table.name,
    ).exec<ColumnsRowData>();
    text.push(['', ...colTitles, ''].join('|'));
    text.push(['', ...colTitles.map(() => ':---:'), ''].join('|'));
    columns.forEach((c) => {
      const values = colKeys.map((k) => c[k]);
      text.push(['', ...values, ''].join('|'));
    });

    // indexd
    const indexd = await new IndexdExecutor(
      this.database,
      table.name,
    ).exec<IndexdRowData>();

    if (indexd.length > 0) {
      // new line
      text.push(...['', '**索引**', '']);
      text.push(['', ...indexdTitles, ''].join('|'));
      text.push(['', ...indexdTitles.map(() => ':---:'), ''].join('|'));
      indexd.forEach((c) => {
        const values = indexdKeys.map((k) => {
          if (k === 'nonunique') {
            return c[k] === 0 ? 'YES' : 'NO';
          } else if (k === 'nullable') {
            return c[k] === 'YES' ? 'YES' : 'NO';
          }

          return c[k];
        });
        text.push(['', ...values, ''].join('|'));
      });
    }

    // new line
    text.push('');

    this.stream.write(text.join('\n'));
  }
}
