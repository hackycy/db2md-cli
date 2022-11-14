import { Command } from 'commander';
import { AbstractCommand } from '../lib/common/abstract.command';
import { Input } from '../lib/common/command.input';

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
      .option('-o, --output [output]', 'Document generation path')
      .action(async (database: string, opts: Record<string, any>) => {
        const inputs: Input[] = [];
        inputs.push({ name: 'database', value: database });

        const options: Input[] = [];
        options.push({ name: 'host', value: opts.host });
        options.push({ name: 'username', value: opts.username });
        options.push({ name: 'password', value: opts.password });
        options.push({ name: 'port', value: opts.port });
        options.push({ name: 'output', value: opts.output });
        options.push({ name: 'level', value: opts.level });

        await this.action.handle(inputs, options);
      });
  }
}
