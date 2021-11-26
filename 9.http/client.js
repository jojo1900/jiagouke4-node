// 浏览器就是一个典型的客户端

const http = require('http');

let client = http.request('http://www.baidu.com',{
    'method':'get', // 请求方法
    // 'port':"4000"
},function(res){ // 会响应你
    let arr = [];
    res.on('data',function(chunk){
        arr.push(chunk)
    });
    res.on('end',function(){
        console.log(Buffer.concat(arr).toString())
    })
})
client.end('a=1'); // request方法必须+end才可以发送请求 



// http.get()  可以直接发get请求 不需要end
// pupetter
