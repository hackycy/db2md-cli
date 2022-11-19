import { WriteStream } from 'fs';

export abstract class AbstractWriter {
  constructor(protected stream: WriteStream, protected database: string) {}

  public abstract write(): Promise<void>;
}
