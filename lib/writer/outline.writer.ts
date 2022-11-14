import { AbstractWriter } from '../common/abstract.writer';
import { TablesRowData } from '../executor';

export class OutlineWriter extends AbstractWriter {
  public async write(tables: TablesRowData[]): Promise<void> {
    const outline: string[] = [];

    tables.forEach((e) => {
      const title = `* [${e.name}](#${e.name})`;

      outline.push(...[title, '']);
    });

    this.stream.write([...outline].join('\n'));
  }
}
