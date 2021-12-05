// 底层就是基于node的http模块，基于http模块二次封装了 req，res
// url.parse(req.url) {pathname}   res.end(JSON.stringify({}))

// 1.帮你对req和res都进行了扩展 增加了很多功能
// 2.解决了常用的写法问题

const express = require('./express'); // express 返回的是一个函数
const app = express(); 

// resful风格 根据路径和方法 来处理不同的请求 返回对应的资源
app.get('/hello',function(req,res){ // 这里的req和res是封装过的 原来node中req和res的方法依旧可以使用
    res.end('hello1');
})
app.get('/hello',function(req,res){ // 这里的req和res是封装过的 原来node中req和res的方法依旧可以使用
    res.end('hello2');
})
app.get('/world',function(req,res){ // 这里的req和res是封装过的 原来node中req和res的方法依旧可以使用
    res.end('world');
})
// app.all('*',function(req,res){ // 这里的req和res是封装过的 原来node中req和res的方法依旧可以使用
//     res.end('*');
// })

app.listen(3000,function(){ // http.createServer()
    console.log('server start 3000')
}); // 监听端口3000