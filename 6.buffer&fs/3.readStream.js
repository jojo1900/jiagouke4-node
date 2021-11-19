const fs = require('fs');
const path = require('path');


// 返回的是一个可读流对象
const rs = fs.createReadStream(path.resolve(__dirname,'a.txt'),{ // 可读流一次可以读取64k
    flags: 'r',// fs.open
    encoding:null, // 默认就是buffer
    mode:0o666, // fs.open(mode)
    autoClose: true, // 读取后是否自动关闭
    emitClose:true, // 是否内部触发一个事件 emit('close')
    start:0, // 从哪到哪
    end:5, // 0 - 5 6个字节 包前又包后
    highWaterMark:2,// 64k  每次读取多少个 默认64k
});

rs.on('open',function(fd){
    console.log(fd);
})
// 默认会在内部递归的将数据读取完毕
rs.on('data',function(data){ // fs.read() -> rs.emit('data',读取到的数据)
    console.log(data)
    // 我们希望能控制读取的速率 ，读完后 等我写入到文件中了 在去读取
    rs.pause(); // 不会触发data事件   配合可写流 
})
rs.on('end',function(){ // 当指定的内容读取完毕后 会触发end事件   rs.emit('end')
    console.log('读取完毕')
})
rs.on('close',function(){ //  rs.emit('close')
    console.log('close');
    clearTimeout(timer)
})
rs.on('error',function(){  //  rs.emit('error')
    console.log('error')
}) 
let timer = setInterval(()=>{
    rs.resume(); // 1s 后恢复读取 再触发data事件
},1000)


// 周日 会手写可读流 + 可写流 原理 + 文件夹的操作  （链表实现 ）  （树的遍历）