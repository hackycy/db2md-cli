import { AbstractExecutor } from '../common/abstract.executor';

export interface VersionRowData {
  version: string;
}

export class VersionExecutor extends AbstractExecutor {
  constructor() {
    super('SELECT VERSION() AS version');
  }
}
