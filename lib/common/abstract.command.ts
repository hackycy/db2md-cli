import { Command } from 'commander';
import { AbstractAction } from './abstract.action';

export abstract class AbstractCommand {
  constructor(protected action: AbstractAction) {}

  public abstract load(program: Command): void;
}
