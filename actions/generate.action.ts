import { AbstractAction } from '../lib/common/abstract.action';

export class GenerateAction extends AbstractAction {
  public handle(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
