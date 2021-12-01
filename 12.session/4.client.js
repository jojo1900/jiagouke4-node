const http = require('http');


// http.get('http://localhost:3000/login', function (res) {
//     res.on('data',function(data){
//         console.log(data.toString())
//     })
// })  
// {"typ":"JWT","alg":"HS256"}         {"name":"zs","id":123, 过期时间}    根据  = 签名
// 第一段表示用什么方式进行签名的
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoienMiLCJpZCI6MTIzfQ.zdQjQQa92-H_WAd1MXNOCYjSb492uR9kU3dikDXlKP0
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoienMiLCJpZCI6MTIzfQ.zdQjQQa92-H_WAd1MXNOCYjSb492uR9kU3dikDXlKP0
// http.get('http://localhost:3000/validate', {
//     headers: {
//         "authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoienMiLCJpZCI6MTIzfQ.zdQjQQa92-H_WAd1MXNOCYjSb492uR9kU3dikDXlKP0'
//     }
// }, function (res) {
//     res.on('data', function (data) {
//         console.log(data.toString())
//     })
// })
http.get('http://localhost:3000', {
    headers: {
        "accept-language": 'zh-CN'
    }
}, function (res) {
    res.on('data', function (data) {
        console.log(data.toString())
    })
})
// 正向代理 (帮着我们访问服务器) 和 反向代理 （帮着服务器来处理客户端端请求的）   cdn （反向代理） 
// webpack proxy 属于什么？ 反向代理


// internationalization

// range:bytes=3-5  客户端可以指定返回某一部分   206
// Accept-Ranges: bytes  服务器可以指定返回的内容 还有总大小 
// Content-Range: bytes 3-5/15444

// user-agent  用户内核 可以判断设备信息 是不是chrome  （判断用户的来源）
// res.statusCode = 302 /  res.setHeader('Location','指定路径')


tcp 的特点 三次握手 四次挥手
http1.2.3 对比  http优化
https