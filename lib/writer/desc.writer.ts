import { AbstractWriter } from '../common/abstract.writer';
import { ColumnsExecutor, ColumnsRowData, TablesRowData } from '../executor';

const titles = ['字段名', '数据类型', '额外信息', '空', '默认值', '注释'];

const keys: (keyof ColumnsRowData)[] = [
  'name',
  'type',
  'extra',
  'isNullable',
  'defaultValue',
  'comment',
];

export class DescWriter extends AbstractWriter {
  public async write(db: string, table: TablesRowData): Promise<void> {
    const columns = await new ColumnsExecutor(
      db,
      table.name,
    ).exec<ColumnsRowData>();

    const text: string[] = [];

    // content
    text.push(['', ...titles, ''].join('|'));
    text.push(['', ...titles.map(() => ':---:'), ''].join('|'));
    columns.forEach((c) => {
      const values = keys.map((k) => c[k]);
      text.push(['', ...values, ''].join('|'));
    });

    // end new line
    text.push(...['', '']);

    this.stream.write(text.join('\n'));
  }
}
