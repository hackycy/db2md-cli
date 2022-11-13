import { AbstractAction } from '../lib/common/abstract.action';
import { Input } from '../lib/common/command.input';
import { DBDataSource } from '../lib/utils/db.datasource';

export class GenerateAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]): Promise<void> {
    const database = inputs.find((e) => e.name === 'database')?.value;
    const host = options.find((e) => e.name === 'host')?.value;
    const username = options.find((e) => e.name === 'username')?.value;
    const port = options.find((e) => e.name === 'port')?.value;
    const password = options.find((e) => e.name === 'password')?.value;

    // init mysql connection
    await DBDataSource.getInstance().init({
      database: database as string,
      host: host as string,
      username: username as string,
      port: port as string,
      password: password as string,
    });
  }
}
