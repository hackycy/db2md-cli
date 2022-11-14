import { createWriteStream } from 'fs';
import { join, resolve } from 'path';
import { AbstractAction } from '../lib/common/abstract.action';
import { Input } from '../lib/common/command.input';
import {
  VersionExecutor,
  VersionRowData,
  TablesRowData,
  TablesExecutor,
} from '../lib/executor';
import { DBDataSource } from '../lib/utils/db.datasource';
import { isString } from '../lib/utils/is';
import { DescWriter, HeaderWriter, OutlineWriter } from '../lib/writer';
import { ensureDirSync } from 'fs-extra';

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
      const output = options.find((e) => e.name === 'output')!.value as string;

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

      // handle gen path
      let path = process.cwd();
      if (isString(path) && path) {
        path = output.startsWith('.') ? resolve(process.cwd(), output) : output;

        // ensure dir created
        ensureDirSync(path);
      }

      // create stream
      const sb = createWriteStream(join(path, `${database}.md`), {
        start: 0,
        encoding: 'utf8',
      });

      const headerWriter = new HeaderWriter(sb);

      // docs header
      await headerWriter.write(
        '数据库文档',
        1,
        false,
        '<a name="返回顶部"></a>',
      );

      // docs outline
      await headerWriter.write('数据表大纲', 2);
      await new OutlineWriter(sb).write(tables);

      // table desc
      await headerWriter.write('数据表详情', 2, true);

      for (let i = 0; i < tables.length; i++) {
        await new DescWriter(sb).write(database, tables[i]);
      }

      // writing end
      sb.end();

      console.log('Document generated!');
    } finally {
      // destroy connection
      DBDataSource.getInstance().destroy();
    }
  }
}
