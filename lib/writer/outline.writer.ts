import { AbstractWriter } from '../common/abstract.writer';
import { TablesRowData } from '../executor';

export class OutlineWriter extends AbstractWriter {
  public async write(tables: TablesRowData[]): Promise<void> {
    const outline: string[] = [];

    tables.forEach((e) => {
      outline.push(`* [${e.name}(${e.comment})](#${e.name})`);
      outline.push('');
    });

    this.stream.write([...outline].join('\n'));
  }
}
