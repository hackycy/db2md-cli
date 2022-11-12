import { Command } from 'commander';
import { AbstractCommand } from '../lib/common/abstract.command';

export class GenerateCommand extends AbstractCommand {
  public load(program: Command): void {
    program
      .command('generate')
      .alias('g')
      .description('generate a markdown document against the database')
      .action(() => {
        console.log('generate');
      });
  }
}
