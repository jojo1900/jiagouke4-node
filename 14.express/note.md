express (老 底层源码都是es5编写的 处理错误也全部是采用的回调方式 构造函数+原型的方式) koa （新 核心小， 用es6来编写的  类）


- 内置了很多功能  路由系统, 内置了很多中间件, 使用一些别人写好的中间件


if(req.url === '/xxx'){

}else if(req.url === '/xxx'){

}

fs.stat(path,function(err){
    fs.createReadStream().pipe(res)
})