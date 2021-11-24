const fs = require('fs');
const path = require('path')
const WriteStream = require('./writeStream');

const ws =  new WriteStream(path.resolve(__dirname,'b.txt'),{
    //  可读流的 highWaterMark 每次读取多少个   可写流： 我期望每次能写入多少
    highWaterMark: 3, // 默认值是16k
    flags:'w', //  写入的标识
    encoding:'utf8',
    start:0, // 开始写入的位置 没有end
    emitClose:true // 是否触发close
});

// 我期望 用3个内存大小的字节 来进行整个写入的操作
let i = 0; // 0-9
function write(){
    let flag = true;
    while(flag && i<=9){
            flag = ws.write(i++ + '','utf8',()=>{
                console.log( '写入了')
            }); // 当写入的时候达到了预期的时候 此时flag 就会变为false
      
    }
    if(i > 9){
         ws.end('ok');
    }
}
write();
ws.on('drain',()=>{ // 等待内存全部写入到文件中后，会触发drain. drain事件只有当达到预期值 (并且消耗掉)的时候才能触发
    console.log('drain')
    write();
})

// 如何将多个异步进行排队