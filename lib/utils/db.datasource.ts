import { createConnection, Connection } from 'mysql2/promise';
import { MysqlConfiguration } from '../configuration/configuration';

export class DBDataSource {
  private static _instance: DBDataSource;

  /**
   * mysql connection ist
   */
  private connection: Connection | null = null;

  public static getInstance(): DBDataSource {
    if (!this._instance) {
      this._instance = new DBDataSource();
    }

    return this._instance;
  }

  /**
   * prepare mysql connection
   */
  public async init(conf: MysqlConfiguration): Promise<void> {
    if (this.connection) return;

    this.connection = await createConnection({
      user: conf.username,
      port: Number(conf.port),
      host: conf.host,
      password: conf.password,
      database: conf.database,
    });
  }

  public async query<T = any>(sql: string): Promise<T> {
    if (!this.connection) {
      throw new Error('Mysql Connection initialization is not complete');
    }

    const [rows] = await this.connection.execute(sql);
    return rows as T;
  }

  public destroy(): void {
    this.connection?.destroy();
  }
}
