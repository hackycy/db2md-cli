import { Command } from 'commander';
import { GenerateAction } from '../actions';
import { GenerateCommand } from './generate.command';

export class CommandLoader {
  static load(program: Command): void {
    new GenerateCommand(new GenerateAction()).load(program);

    // 判断是否是debug模式
    program.option('-d, --debug', 'Open debug mode', false);
    program.on('option:debug', function (this: Command) {
      process.env.DEBUG = this.opts().debug;
    });

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
