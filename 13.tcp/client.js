const net = require('net'); // 通过net模块来创建tcp服务
const socket = new net.Socket(); // 套接字  对讲机
// 连接8080端口
socket.connect(8080, 'localhost');
// 连接成功后给服务端发送消息
socket.on('connect', function(data) {
  socket.write('hello'); // 浏览器和客户端说 hello
    socket.end()
});
socket.on('data', function(data) {
    console.log(data.toString())
})
socket.on('error', function(error) {
    console.log(error);
});