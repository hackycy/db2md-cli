import { AbstractWriter } from '../common/abstract.writer';
import {
  ColumnsExecutor,
  ColumnsRowData,
  IndexdExecutor,
  IndexdRowData,
  TablesRowData,
} from '../executor';

const colTitles = ['字段', '类型', '空', '默认值', 'EXTRA', '注释'];

const colKeys: (keyof ColumnsRowData)[] = [
  'name',
  'type',
  'isNullable',
  'defaultValue',
  'extra',
  'comment',
];

const indexdTitles = [
  '键名',
  '类型',
  '唯一',
  '字段',
  '基数',
  '排序规则',
  '空',
  '注释',
];

const indexdKeys: (keyof IndexdRowData)[] = [
  'indexName',
  'type',
  'nonunique',
  'colName',
  'cardinality',
  'collation',
  'nullable',
  'comment',
];

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
        const values = indexdKeys.map((k) => c[k]);
        text.push(['', ...values, ''].join('|'));
      });
    }

    // new line
    text.push(...['', '']);

    this.stream.write(text.join('\n'));
  }
}
