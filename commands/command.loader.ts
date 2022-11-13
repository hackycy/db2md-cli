import { Command } from 'commander';
import { GenerateAction } from '../actions';
import { GenerateCommand } from './generate.command';

export class CommandLoader {
  static load(program: Command): void {
    new GenerateCommand(new GenerateAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: Command) {
    program.on('command:*', () => {
      console.error('\nError invalid command: %s', program.args.join(' '));
      console.log('See --help for a list of available commands.\n');
      process.exit(1);
    });
  }
}
