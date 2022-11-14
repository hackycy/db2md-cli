# db2md-cli

> MySQL数据库markdown文档生成工具

## 安装

``` sh
npm install -g db2md-cli
```

## 使用

``` sh
Usage: db2md generate|g [options] <database>

generate a markdown document against the database

Options:
  -pwd, --password <password>  Database password
  -h, --host [host]            Database host (default: "127.0.0.1")
  -u, --username [username]    Database username (default: "root")
  -p, --port [port]            Database host port (default: "3306")
  -o, --output [output]        Document generation path
  --help                       Output usage information.
```

**案例**

``` sh
db2md g -u root -p 3306 -pwd root -h 127.0.0.1 ark_admin
```

> 使用root用户密码为root连接ark_admin数据库生成文档

