import { Command } from 'commander';
import { AbstractCommand } from '../lib/common/abstract.command';
import { Input } from '../lib/common/command.input';
import {
  checkTypeValidity,
  parsePortNumber,
} from '../lib/utils/input-processing';

export class GenerateCommand extends AbstractCommand {
  public load(program: Command): void {
    program
      .command('generate', { isDefault: true })
      .alias('g')
      .description('generate a markdown or docx file against the database')
      .argument('<database>', 'Specifies the database name')
      .argument(
        '[type]',
        'Specifies the type of file to be generated: md,docx',
        checkTypeValidity,
      )
      .option('-P, --password [password]', 'Database password', 'root')
      .option('-h, --host [host]', 'Database host', '127.0.0.1')
      .option('-u, --username [username]', 'Database username', 'root')
      .option<number>(
        '-p, --port [port]',
        'Database host port',
        parsePortNumber,
        3306,
      )
      .option(
        '-o, --output [output]',
        'Document generation path, support for relative path',
      )
      .option('-f, --force', 'overwrite target file if it exists', false)
      .action(
        async (database: string, type: string, opts: Record<string, any>) => {
          const inputs: Input[] = [];
          inputs.push({ name: 'database', value: database });
          inputs.push({ name: 'type', value: type });

          const options: Input[] = [];
          options.push({ name: 'host', value: opts.host });
          options.push({ name: 'username', value: opts.username });
          options.push({ name: 'password', value: opts.password });
          options.push({ name: 'port', value: opts.port });
          options.push({ name: 'output', value: opts.output });
          options.push({ name: 'force', value: opts.force });

          await this.action.handle(inputs, options);
        },
      );
  }
}
