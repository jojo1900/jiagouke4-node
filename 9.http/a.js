const http = require('http'); // 引入了http模块 


// 请求必须得到响应这一条才算完成 ， 否则就是pending状态

// 这里可以创建一个服务端 监听客户端的请求到来
const server = http.createServer((req, res) => { // tcp 来的 node中有自己先是一个传输成模块 net
    // 这里的处理逻辑 尽量异步 而且不要有大量的计算逻辑 cpu密集 会导致请求阻塞
    res.end('ok')
});
let port = 4000;
// 手动重启  改服务端代码必须重启  开发中nodemon  pm2 
// nodemon node的监控器 监控文件的变化 文件变化后可以自动重启
server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') { // 端口被占用了 
        server.listen(++port); // 底层是基于发布订阅的 监听成功会触发函数执行
    }
})
server.listen(port, function () {
    console.log(`server start ${port}`)
});