# db2md-cli

> MySQL数据库文档生成工具,支持生成`markdown`以及`word`文档

## 安装

``` sh
npm install -g db2md-cli
```

## 使用

``` sh
$ db2md help g
Usage: db2md generate|g [options] <database> [type]

generate a markdown or docx file against the database

Arguments:
  database                   Specifies the database name
  type                       Specifies the type of file to be generated: md,docx

Options:
  -P, --password [password]  Database password (default: "root")
  -H, --host [host]          Database host (default: "127.0.0.1")
  -u, --username [username]  Database username (default: "root")
  -p, --port [port]          Database host port (default: 3306)
  -o, --output [output]      Document generation path, support for relative path
  -f, --force                overwrite target file if it exists (default: false)
  -h, --help                 Output usage information.
```

案例: [sample](https://github.com/hackycy/db2md-cli/blob/main/sample)

``` sh
db2md g -u root -p 3306 -P root -H 127.0.0.1 ark_admin md
```

> 使用`root`用户, 密码为`root`连接`ark_admin`数据库生成`markdown`文档, 默认会在当前路径下生成`数据库名称.md`. 如需生成`word`文档则将`md`替换为`docx`

