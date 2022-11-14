# 数据库文档

<a name="返回顶部"></a>

## 数据表大纲

* [sys_dept(部门)](#sys_dept)

* [sys_dictionary(系统参数)](#sys_dictionary)

* [sys_job(工作岗位)](#sys_job)

* [sys_log(系统日志)](#sys_log)

* [sys_perm_menu(权限&菜单)](#sys_perm_menu)

* [sys_profession(职称)](#sys_profession)

* [sys_role(角色)](#sys_role)

* [sys_user(用户)](#sys_user)

## 数据表详情

<a name="sys_dept"></a>

* sys_dept(部门)[↑](#返回顶部)

|字段名|数据类型|索引|额外信息|允许空|默认值|字段说明|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(11) unsigned|PRI|auto_increment|NO||编号|
|parent_id|int(11) unsigned|||NO||父级id|
|name|varchar(50)|||NO||部门简称|
|full_name|varchar(50)|||NO||部门全称|
|unique_key|varchar(50)|UNI||NO||唯一值|
|type|tinyint(1) unsigned|||NO||1=公司 2=子公司 3=部门|
|status|tinyint(1) unsigned|||NO||0=禁用 1=开启|
|order_num|int(11) unsigned|||NO||排序值|
|remark|varchar(200)|||NO||备注|
|create_time|timestamp|||NO|CURRENT_TIMESTAMP|创建时间|
|update_time|timestamp||on update CURRENT_TIMESTAMP|NO|CURRENT_TIMESTAMP|更新时间|

<a name="sys_dictionary"></a>

* sys_dictionary(系统参数)[↑](#返回顶部)

|字段名|数据类型|索引|额外信息|允许空|默认值|字段说明|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(11) unsigned|PRI|auto_increment|NO||编号|
|parent_id|int(11) unsigned|||NO|0|0=配置集 !0=父级id|
|name|varchar(50)|||NO||名称|
|type|tinyint(2) unsigned|||NO|1|1文本 2数字 3数组 4单选 5多选 6下拉 7日期 8时间 9单图 10多图 11单文件 12多文件|
|unique_key|varchar(50)|UNI||NO||唯一值|
|value|varchar(2048)|||NO||配置值|
|status|tinyint(1) unsigned|||NO|1|0=禁用 1=开启|
|order_num|int(11) unsigned|||NO|0|排序值|
|remark|varchar(200)|||NO||备注|
|create_time|timestamp|||NO|CURRENT_TIMESTAMP|创建时间|
|update_time|timestamp||on update CURRENT_TIMESTAMP|NO|CURRENT_TIMESTAMP|更新时间|

<a name="sys_job"></a>

* sys_job(工作岗位)[↑](#返回顶部)

|字段名|数据类型|索引|额外信息|允许空|默认值|字段说明|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(11) unsigned|PRI|auto_increment|NO||编号|
|name|varchar(50)|UNI||NO||岗位名称|
|status|tinyint(1) unsigned|||NO|1|0=禁用 1=开启 |
|order_num|int(11) unsigned|||NO|0|排序值|
|create_time|timestamp|||NO|CURRENT_TIMESTAMP|创建时间|
|update_time|timestamp||on update CURRENT_TIMESTAMP|NO|CURRENT_TIMESTAMP|开启时间|

<a name="sys_log"></a>

* sys_log(系统日志)[↑](#返回顶部)

|字段名|数据类型|索引|额外信息|允许空|默认值|字段说明|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(10) unsigned|PRI|auto_increment|NO||编号|
|user_id|int(11) unsigned|||NO||操作账号|
|ip|varchar(100)|||NO||ip|
|uri|varchar(200)|||NO||请求路径|
|type|tinyint(1) unsigned|||NO||1=登录日志 2=操作日志|
|request|varchar(2048)|||NO||请求数据|
|status|tinyint(1) unsigned|||NO|1|0=失败 1=成功|
|create_time|timestamp|||NO|CURRENT_TIMESTAMP|创建时间|
|update_time|timestamp||on update CURRENT_TIMESTAMP|YES|CURRENT_TIMESTAMP|更新时间|

<a name="sys_perm_menu"></a>

* sys_perm_menu(权限&菜单)[↑](#返回顶部)

|字段名|数据类型|索引|额外信息|允许空|默认值|字段说明|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(11) unsigned|PRI|auto_increment|NO||编号|
|parent_id|int(11) unsigned|||NO|0|父级id|
|name|varchar(50)|||NO||名称|
|router|varchar(1024)|||NO||路由|
|perms|varchar(1024)|||NO||权限|
|type|tinyint(1) unsigned|||NO|0|0=目录 1=菜单 2=权限|
|icon|varchar(200)|||NO||图标|
|order_num|int(11) unsigned|||YES|0|排序值|
|view_path|varchar(1024)|||NO||页面路径|
|is_show|tinyint(1) unsigned|||YES|1|0=隐藏 1=显示|
|active_router|varchar(1024)|||NO||当前激活的菜单|
|create_time|timestamp|||NO|CURRENT_TIMESTAMP|创建时间|
|update_time|timestamp||on update CURRENT_TIMESTAMP|NO|CURRENT_TIMESTAMP|更新时间|

<a name="sys_profession"></a>

* sys_profession(职称)[↑](#返回顶部)

|字段名|数据类型|索引|额外信息|允许空|默认值|字段说明|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(11) unsigned|PRI|auto_increment|NO||编号|
|name|varchar(50)|UNI||NO||职称|
|status|tinyint(1) unsigned|||NO|1|0=禁用 1=开启|
|order_num|int(11) unsigned|||NO|0|排序值|
|create_time|timestamp|||NO|CURRENT_TIMESTAMP|创建时间|
|update_time|timestamp|||NO|CURRENT_TIMESTAMP|更新时间|

<a name="sys_role"></a>

* sys_role(角色)[↑](#返回顶部)

|字段名|数据类型|索引|额外信息|允许空|默认值|字段说明|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(10) unsigned|PRI|auto_increment|NO||编号|
|parent_id|int(11) unsigned|||NO|0|父级id|
|name|varchar(50)|||NO||名称|
|unique_key|varchar(50)|UNI||NO||唯一标识|
|remark|varchar(200)|||NO||备注|
|perm_menu_ids|json|||NO||权限集|
|status|tinyint(1) unsigned|||NO|1|0=禁用 1=开启|
|order_num|int(11) unsigned|||NO|0|排序值|
|create_time|timestamp|||NO|CURRENT_TIMESTAMP|创建时间|
|update_time|timestamp||on update CURRENT_TIMESTAMP|NO|CURRENT_TIMESTAMP|更新时间|

<a name="sys_user"></a>

* sys_user(用户)[↑](#返回顶部)

|字段名|数据类型|索引|额外信息|允许空|默认值|字段说明|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|id|int(10) unsigned|PRI|auto_increment|NO||编号|
|account|varchar(50)|UNI||NO||账号|
|password|char(32)|||NO||密码|
|username|varchar(50)|||NO||姓名|
|nickname|varchar(50)|||NO||昵称|
|avatar|varchar(400)|||NO||头像|
|gender|tinyint(1) unsigned|||NO|0|0=保密 1=女 2=男|
|email|varchar(50)|||NO||邮件|
|mobile|char(11)|||NO||手机号|
|profession_id|int(11) unsigned|||NO||职称|
|job_id|int(11) unsigned|||NO||岗位|
|dept_id|int(11) unsigned|||NO||部门|
|role_ids|json|||NO||角色集|
|status|tinyint(1) unsigned|||NO|1|0=禁用 1=开启|
|order_num|int(11) unsigned|||NO|0|排序值|
|remark|varchar(200)|||NO||备注|
|create_time|timestamp|||NO|CURRENT_TIMESTAMP|创建时间|
|update_time|timestamp||on update CURRENT_TIMESTAMP|NO|CURRENT_TIMESTAMP|更新时间|

