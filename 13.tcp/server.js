const net = require('net');
const server = net.createServer(function(socket){
    socket.on('data',function (data) { // 客户端和服务端
        // console.log(data.toString());
        socket.write('hi'); // 服务端和客户端说 hi
    });
    socket.on('end',function () {
        console.log('客户端关闭')
    })
})
server.on('error',function(err){
    console.log(err);
})
server.listen(8080); // 监听8080端口

// http 基于tcp的   tcp 只是将http的数据进行传输