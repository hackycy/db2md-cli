import { WriteStream } from 'fs';
import { TablesRowData } from '../executor';

export abstract class AbstractWriter {
  constructor(
    protected stream: WriteStream,
    protected database: string,
    protected tables: TablesRowData[],
  ) {}

  public abstract write(): Promise<void>;
}
