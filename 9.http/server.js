const http = require('http'); // 引入了http模块 


// 请求必须得到响应这一条才算完成 ， 否则就是pending状态

// 这里可以创建一个服务端 监听客户端的请求到来
const server = http.createServer((req, res) => { // tcp 来的 node中有自己先是一个传输成模块 net
    // req 代表客户端的请求 
    // res 代表服务端的响应 
    console.log(req.method); // 默认在url输入地址访问就是get请求  方法是大写的
    console.log(req.url);  // /xxxx?a=1   hash值服务端获取不到（前端hash路由无法实现服务端渲染）
    console.log(req.httpVersion); // 版本号 
    // /r/n
    console.log(req.headers); // header都是小写的  key:value
    ///r/n/r/n

    // req是一个可读流, 读取客户的数据

    let arr = [];
    req.on('data',function(chunk){ // tcp 传输会分段 
        arr.push(chunk);
    });
    // push(null)
    req.on('end',function(){ // 整个请求体接受完毕后会触发， 没有请求体也会触发end事件
        console.log(Buffer.concat(arr).toString())
    }); 

    // express koa  都是基于这些特点 扩展出来的 

    // 服务端 
    // res.statusCode = 450;
    // res.statusMessage = 'no exists';
    res.setHeader('name','zf'); // 自定义header   response header
    res.setHeader('Content-Type','text/html;charset=utf-8'); // 防止乱码

    // end 可以放入buffer or String  res 是一个可写流
    res.write('1');
    res.write('2'); // 调用end 表示响应结束  不写就一直loading
    res.end(Buffer.from('珠峰')); 
});
let port = 4000;
// 手动重启  改服务端代码必须重启  开发中nodemon  pm2 
// nodemon node的监控器 监控文件的变化 文件变化后可以自动重启
server.on('error',function(err){
    if(err.code === 'EADDRINUSE'){ // 端口被占用了 
        server.listen(++port); // 底层是基于发布订阅的 监听成功会触发函数执行
    }
})
server.listen(port, function () {
    console.log(`server start ${port}`)
});