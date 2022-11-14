import { WriteStream } from 'fs';

export abstract class AbstractWriter {
  constructor(protected stream: WriteStream) {}

  public abstract write(...args: any[]): Promise<void>;
}
