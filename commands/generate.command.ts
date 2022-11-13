import { Command } from 'commander';
import { AbstractCommand } from '../lib/common/abstract.command';
import { Input } from '../lib/common/command.input';
import { DBDataSource } from '../lib/utils/db.datasource';

export class GenerateCommand extends AbstractCommand {
  public load(program: Command): void {
    program
      .command('generate <database>')
      .alias('g')
      .description('generate a markdown document against the database')
      .requiredOption('-pwd, --password <password>', 'Database password')
      .option('-h, --host [host]', 'Database host', '127.0.0.1')
      .option('-u, --username [username]', 'Database username', 'root')
      .option('-p, --port [port]', 'Database host port', '3306')
      .action(async (database: string, opts: Record<string, any>) => {
        const inputs: Input[] = [];
        inputs.push({ name: 'database', value: database });

        const options: Input[] = [];
        options.push({ name: 'host', value: opts.host });
        options.push({ name: 'username', value: opts.username });
        options.push({ name: 'password', value: opts.password });
        options.push({ name: 'port', value: opts.port });

        try {
          await this.action.handle(inputs, options);
        } finally {
          DBDataSource.getInstance().destroy();
        }
      });
  }
}
