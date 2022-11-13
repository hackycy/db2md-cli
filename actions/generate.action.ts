import { AbstractAction } from '../lib/common/abstract.action';
import { Input } from '../lib/common/command.input';
import { VersionExecutor, VersionRowData } from '../lib/executor';
import { TablesRowData, TablesExecutor } from '../lib/executor/tables.executor';
import { DBDataSource } from '../lib/utils/db.datasource';

export class GenerateAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]): Promise<void> {
    try {
      const database = inputs.find((e) => e.name === 'database')!
        .value as string;
      const host = options.find((e) => e.name === 'host')!.value as string;
      const username = options.find((e) => e.name === 'username')!
        .value as string;
      const port = options.find((e) => e.name === 'port')!.value as string;
      const password = options.find((e) => e.name === 'password')!
        .value as string;

      // init mysql connection
      await DBDataSource.getInstance().init({
        database,
        host,
        username,
        port,
        password,
      });

      // test connection
      const [{ version }] = await new VersionExecutor().exec<VersionRowData>();

      console.log(
        `Mysql connection is successful. database version is ${version}`,
      );

      console.log('\nLooking for all tables in the database:');
      const tables = await new TablesExecutor(database).exec<TablesRowData>();
      console.table(tables);
    } finally {
      // destroy connection
      DBDataSource.getInstance().destroy();
    }
  }
}
