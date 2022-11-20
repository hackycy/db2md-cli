import { createWriteStream } from 'fs';
import { join, resolve } from 'path';
import { AbstractAction } from '../lib/common/abstract.action';
import { Input } from '../lib/common/command.input';
import {
  TablesExecutor,
  TablesRowData,
  VersionExecutor,
  VersionRowData,
} from '../lib/executor';
import { DBDataSource } from '../lib/utils/db.datasource';
import { isDebug, isString } from '../lib/utils/is';
import { ensureDirSync, existsSync } from 'fs-extra';
import * as inquirer from 'inquirer';
import { DocType, DocTypeList } from '../lib/constants/doc-type';
import { loadDatabaseConfiguration } from '../lib/configuration/configuration.load';
import { DocxWriter, MarkdownWriter } from '../lib/writer';
import { AbstractWriter } from '../lib/common/abstract.writer';

export class GenerateAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]): Promise<void> {
    try {
      let docType = inputs.find((e) => e.name === 'type')!.value as DocType;
      const output = options.find((e) => e.name === 'output')!.value as string;
      const force = options.find((e) => e.name === 'force')!.value as boolean;

      // 加载MYSQL配置
      const sqlconf = loadDatabaseConfiguration(inputs.concat(options));

      // 生成的文档类型, 如果未填写则让尝试选择生成的类型
      if (!docType) {
        const { type } = await inquirer.prompt([
          {
            type: 'list',
            message: 'Select the type of document you want to generate',
            name: 'type',
            choices: DocTypeList,
          },
        ]);

        docType = type;
      }

      // 初始化mysql数据库连接
      await DBDataSource.getInstance().init(sqlconf);

      // 测试连接查询mysql版本
      const [{ version }] = await new VersionExecutor().exec<VersionRowData>();

      console.log(
        `\nMysql connection is successful. database version is ${version}`,
      );

      // 数据库名称
      const database = sqlconf.database!;

      // 处理输出文件的路径
      let path = process.cwd();
      if (isString(output) && output) {
        // 处理相对路径
        path = output.startsWith('.') ? resolve(path, output) : output;
        // 强制创建路径
        ensureDirSync(path);
      }

      // 文件路径
      const filePath = join(path, `${database}.${docType}`);

      // 当文件已存在，提示是否需要覆盖
      if (existsSync(filePath) && !force) {
        const { ok } = await inquirer.prompt([
          {
            type: 'confirm',
            message: 'Whether to overwrite the existing file',
            name: 'ok',
          },
        ]);

        if (!ok) {
          console.log(`\nNothing to do!`);
          process.exit(1);
        }
      }

      console.log('\nLooking for all tables in the database...');
      const tables = await new TablesExecutor(database).exec<TablesRowData>();

      if (tables.length <= 0) {
        console.log('\nTable is empty, no documents need to be generated!');
        process.exit(1);
      }

      isDebug() && console.table(tables);

      // 创建流
      const sb = createWriteStream(filePath, {
        start: 0,
        encoding: 'utf8',
      });

      // 处理文档内容
      let writer: AbstractWriter | null = null;
      if (docType === 'docx') {
        writer = new DocxWriter(sb, database, tables);
      } else {
        writer = new MarkdownWriter(sb, database, tables);
      }
      await writer.write();

      // 结束流
      sb.end();

      console.log('\n√ Document has been generated in ' + filePath);
    } finally {
      // destroy connection
      DBDataSource.getInstance().destroy();
    }
  }
}
