import { AbstractExecutor } from '../common/abstract.executor';

export interface TablesRowData {
  name: string;
  comment: string;
  engine: string;
}

export class TablesExecutor extends AbstractExecutor {
  constructor(dbname: string) {
    super(
      `SELECT TB.TABLE_NAME AS name, TB.TABLE_COMMENT AS comment, TB.ENGINE AS engine FROM INFORMATION_SCHEMA.TABLES TB WHERE TB.TABLE_SCHEMA = ?`,
      [dbname],
    );
  }
}
