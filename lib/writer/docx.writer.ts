import { AbstractWriter } from '../common/abstract.writer';
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  XmlComponent,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  VerticalAlign,
  WidthType,
} from 'docx';
import {
  ColumnsExecutor,
  ColumnsRowData,
  IndexdExecutor,
  IndexdRowData,
  TablesRowData,
} from '../executor';
import {
  colKeys,
  colTitles,
  indexdKeys,
  indexdTitles,
} from '../constants/table';

export class DocxWriter extends AbstractWriter {
  async write(): Promise<void> {
    const tableComp: XmlComponent[] = [];

    for (let i = 0; i < this.tables.length; i++) {
      tableComp.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: this.tables[i].name,
              bold: true,
            }),
          ],
        }),
      );
      tableComp.push(new Paragraph({}));

      const comment = this.tables[i].comment;

      if (comment) {
        tableComp.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `表注释: ${comment}`,
                color: '#24292f',
              }),
            ],
          }),
        );
        tableComp.push(new Paragraph({}));
      }

      const t = await this.createTableDetail(this.tables[i]);
      tableComp.push(t);

      tableComp.push(new Paragraph({}));
      tableComp.push(
        new Paragraph({
          children: [
            new TextRun({
              text: '索引',
              bold: true,
            }),
          ],
        }),
      );
      tableComp.push(new Paragraph({}));
      const t2 = await this.createIndexdDetail(this.tables[i]);
      tableComp.push(t2);

      tableComp.push(new Paragraph({}));
    }

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  bold: true,
                  text: `${this.database}数据库文档`,
                }),
              ],
            }),
            new Paragraph({}),
            ...tableComp,
          ],
        },
      ],
    });

    // 写入文件
    const buffer = await Packer.toBuffer(doc);
    this.stream.write(buffer);
  }

  protected async createIndexdDetail(table: TablesRowData): Promise<Table> {
    const indexd = await new IndexdExecutor(
      this.database,
      table.name,
    ).exec<IndexdRowData>();

    const rows: TableRow[] = indexd.map((c) => {
      return new TableRow({
        children: indexdKeys.map((k) => {
          let value = c[k];

          if (k === 'nonunique') {
            value = c[k] === 0 ? 'YES' : 'NO';
          } else if (k === 'nullable') {
            value = c[k] === 'YES' ? 'YES' : 'NO';
          }

          return new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: value as string,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          });
        }),
      });
    });

    return new Table({
      rows: [
        new TableRow({
          children: indexdTitles.map((e) => {
            return new TableCell({
              verticalAlign: VerticalAlign.CENTER,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: e,
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            });
          }),
        }),
        ...rows,
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    });
  }

  protected async createTableDetail(table: TablesRowData): Promise<Table> {
    const columns = await new ColumnsExecutor(
      this.database,
      table.name,
    ).exec<ColumnsRowData>();

    const rows: TableRow[] = columns.map((col) => {
      return new TableRow({
        children: colKeys.map((key) => {
          return new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: col[key],
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          });
        }),
      });
    });

    return new Table({
      rows: [
        new TableRow({
          children: colTitles.map((e) => {
            return new TableCell({
              verticalAlign: VerticalAlign.CENTER,
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: e,
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            });
          }),
        }),
        ...rows,
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    });
  }
}
