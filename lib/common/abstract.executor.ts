import { DBDataSource } from '../utils/db.datasource';

export abstract class AbstractExecutor {
  constructor(protected sql: string, protected args: any[] = []) {}

  public async exec<T>(): Promise<T[]> {
    const ret = await DBDataSource.getInstance().query(this.sql, this.args);
    return ret;
  }
}
