import { AbstractExecutor } from '../common/abstract.executor';

export interface ColumnsRowData {
  name: string;
  defaultValue: string;
  isNullable: string;
  type: string;
  key: string;
  extra: string;
  comment: string;
}

export class ColumnsExecutor extends AbstractExecutor {
  constructor(db: string, table: string) {
    super(
      'SELECT COLUMN_NAME AS name, COLUMN_DEFAULT AS defaultValue, IS_NULLABLE AS isNullable, ' +
        'COLUMN_TYPE AS type, COLUMN_KEY AS `key`, EXTRA AS extra, COLUMN_COMMENT AS `comment` ' +
        'FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
      [db, table],
    );
  }
}
