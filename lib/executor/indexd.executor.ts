import { AbstractExecutor } from '../common/abstract.executor';

export interface IndexdRowData {
  indexName: string;
  type: string; // 类型
  nonunique: number; // 非唯一 0
  colName: string;
  collation: string; // 排序规则
  cardinality: string; // 基数
  comment: string;
  nullable: string;
}

export class IndexdExecutor extends AbstractExecutor {
  constructor(db: string, table: string) {
    super(
      'SELECT INDEX_NAME AS indexName, INDEX_TYPE AS type, NON_UNIQUE AS nonunique, ' +
        'COLUMN_NAME AS colName, COLLATION AS collation, CARDINALITY AS `cardinality`, ' +
        'INDEX_COMMENT AS `comment`, NULLABLE AS `nullable` ' +
        'FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
      [db, table],
    );
  }
}
