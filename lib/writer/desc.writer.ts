import { AbstractWriter } from '../common/abstract.writer';
import {
  ColumnsExecutor,
  ColumnsRowData,
  IndexdExecutor,
  IndexdRowData,
  TablesRowData,
} from '../executor';
import { colTitles, colKeys, indexdKeys, indexdTitles } from '../ui/table';

export class DescWriter extends AbstractWriter {
  public async write(db: string, table: TablesRowData): Promise<void> {
    const text: string[] = [];

    // columns
    const columns = await new ColumnsExecutor(
      db,
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
      db,
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
