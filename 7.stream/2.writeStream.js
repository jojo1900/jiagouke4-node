const fs = require('fs');
const path = require('path')

const ws = fs.createWriteStream(path.resolve(__dirname,'b.txt'),{
    //  可读流的 highWaterMark 每次读取多少个   可写流： 我期望每次能写入多少
    highWaterMark: 3, // 默认值是16k
    flags:'w', //  写入的标识
    encoding:'utf8',
    start:0, // 开始写入的位置 没有end
    emitClose:true // 是否触发close
});

// 写入的编码只能是 字符串或者二进制数据
let flag = ws.write('1','utf8',function(){ // 多个异步并发 -》 串行  内部会将多个异步任务进行盘对
    console.log('成功1')
}); // 底层调用的是 fs.write() 是异步的方法 
console.log(flag);
flag = ws.write('2','utf8',function(){
    console.log('成功2')
});
console.log(flag);
flag = ws.write('3','utf8',function(){
    console.log('成功3')
})
console.log(flag);
flag = ws.write('4','utf8',function(){
    console.log('成功4')
})
console.log(flag);
ws.end('ok'); // 内部 采用的就是 write + close

ws.on('close',function(){
    console.log('close')
})

// 写也是要有一个缓存区