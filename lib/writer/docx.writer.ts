import { AbstractWriter } from '../common/abstract.writer';

export class DocxWriter extends AbstractWriter {
  async write(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
