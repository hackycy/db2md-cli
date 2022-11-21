import { ColumnsRowData, IndexdRowData } from '../executor';

export const colTitles = ['字段', '类型', '空', '默认值', 'EXTRA', '注释'];

export const colKeys: (keyof ColumnsRowData)[] = [
  'name',
  'type',
  'isNullable',
  'defaultValue',
  'extra',
  'comment',
];

export const indexdTitles = [
  '键名',
  '类型',
  '唯一',
  '字段',
  '基数',
  '排序规则',
  '空',
  '注释',
];

export const indexdKeys: (keyof IndexdRowData)[] = [
  'indexName',
  'type',
  'nonunique',
  'colName',
  'cardinality',
  'collation',
  'nullable',
  'comment',
];

export const docxTableColor = {
  text_color_heading_2: '#57606a',
};
