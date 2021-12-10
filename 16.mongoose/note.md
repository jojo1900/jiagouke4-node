## 安装后会注册这样一个服务

C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\5.0\bin\mongod.cfg" --service  (默认端口是27017)


服务端指定了一个配置文件以服务端的形式运行 表示开机就会自动启动



## 我们还需要启动客户端来链接

我先启动一个端口是 27018?
mongod --dbpath="C:\Program Files\MongoDB\Server\5.0\my" --port 30000

C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\5.0\bin\mongod.cfg"

如果启动mongod时候没有指定 路径 会默认查找/data/db

> 默认安装后会启动mongod ，之后可以通过mongo 来链接服务端 , 可以指定通过--host来进行链接


## mongo存储数据的组成
- 数据库 （database）
- 集合   (table) collection
- 文档  document 数据 BSON （json） 二进制的json格式 类型比json多一些


## 帮助文档
- db.help() 数据库中的方法 
- db.collections.help() 找到集合中的方法



{name:zf,age:12,address:'xxx'}

name:1  表示只显示name   age 和 address要隐藏掉
age:0  表示只有age不要   name 和 address要显示

db.students.update({name:"zs"},{$set:{hobby:['read','swiming']}})
db.students.find({name:"zs","hobby.0":"read"})
// 嵌套类型可以采用下标的方式来查找
db.students.find({name:"zs","hobby":{$all:["swiming","read"]}})

db.students.update(查询条件，修改的值)  db.students.remove(删除条件)
updateMany                              deleteOne 删除一条


// 休息三份 mongoose