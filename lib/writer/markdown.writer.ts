import { AbstractWriter } from '../common/abstract.writer';
import {
  ColumnsExecutor,
  ColumnsRowData,
  IndexdExecutor,
  IndexdRowData,
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
    // title
    this.stream.write(
      this.createTitle(
        `${this.database}数据库文档`,
        1,
        false,
        '<a name="返回顶部"></a>',
      ),
    );

    // outline
    this.stream.write(this.writeOutline(this.tables));

    // tables
    for (let i = 0; i < this.tables.length; i++) {
      this.stream.write(
        this.createTitle(
          `${this.tables[i].name}[↑](#返回顶部)<a name="${this.tables[i].name}"></a>`,
          2,
          true,
          this.tables[i].comment
            ? `> 表注释: ${this.tables[i].comment}`
            : undefined,
        ),
      );

      this.stream.write(await this.createTable(this.tables[i]));
    }
  }

  protected createTitle(
    title: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    newLine = false,
    subTitle?: string,
  ): string {
    const text: string[] = [];

    if (newLine) {
      text.push('');
    }

    text.push(...[`${'#'.repeat(level)} ${title}`, '']);

    if (subTitle) {
      text.push(...[subTitle, '']);
    }

    text.push('');

    return text.join('\n');
  }

  protected writeOutline(tables: TablesRowData[]): string {
    const outline: string[] = [];

    tables.forEach((e) => {
      const title = `* [${e.name}](#${e.name})`;

      outline.push(...[title, '']);
    });

    return [...outline].join('\n');
  }

  protected async createTable(table: TablesRowData): Promise<string> {
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

    return text.join('\n');
  }
}
