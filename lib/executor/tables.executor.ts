import { AbstractExecutor } from '../common/abstract.executor';

export interface TablesRowData {
  name: string;
  comment: string;
  engine: string;
}

export class TablesExecutor extends AbstractExecutor {
  constructor(dbname: string) {
    super(
      `SELECT TABLE_NAME AS name, TABLE_COMMENT AS comment, ENGINE AS engine FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?`,
      [dbname],
    );
  }
}
