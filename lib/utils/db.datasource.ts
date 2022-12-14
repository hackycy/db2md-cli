import { createConnection, Connection } from 'mysql2/promise';
import { ConnectionOptions } from 'mysql2';

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
  public async init(conf: ConnectionOptions): Promise<void> {
    if (this.connection) return;

    this.connection = await createConnection(conf);
  }

  public async query<T = any>(sql: string, args: any[] = []): Promise<T> {
    if (!this.connection) {
      throw new Error('Mysql Connection initialization is not complete');
    }

    const [rows] = await this.connection.execute(sql, args);
    return rows as T;
  }

  public destroy(): void {
    this.connection?.destroy();
  }
}
