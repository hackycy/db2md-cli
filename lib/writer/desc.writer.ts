import { AbstractWriter } from '../common/abstract.writer';
import { ColumnsExecutor, ColumnsRowData, TablesRowData } from '../executor';

const titles = [
  '字段名',
  '数据类型',
  '索引',
  '额外信息',
  '允许空',
  '默认值',
  '字段说明',
];

const keys: (keyof ColumnsRowData)[] = [
  'name',
  'type',
  'key',
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

    // link
    text.push(...[`<a name="${table.name}"></a>`, '']);

    // title
    text.push(...[`* ${table.name}(${table.comment})[↑](#返回顶部)`, '']);

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
