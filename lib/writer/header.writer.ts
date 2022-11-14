import { AbstractWriter } from '../common/abstract.writer';

export class HeaderWriter extends AbstractWriter {
  public async write(
    title: string,
    level: 1 | 2,
    newLine = false,
    subTitle?: string,
  ): Promise<void> {
    const text: string[] = [];

    if (newLine) {
      text.push('');
    }

    text.push(...[`${'#'.repeat(level)} ${title}`, '']);

    if (subTitle) {
      text.push(...[subTitle, '']);
    }

    text.push('');

    this.stream.write(text.join('\n'));
  }
}
