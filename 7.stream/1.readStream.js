const fs = require('fs'); // 我们现在说的这个可读流是基于文件
const path = require('path')
const ReadStream = require('./readstream')
// 父类叫Readable接口， 我们使用的文件可读流是继承于这个Readable的
const rs = fs.createReadStream(path.resolve(__dirname,'a.txt'),{
    flags:'r', // fs.open(path,'r')
    highWaterMark: 4, // 每次读取的个数  64 * 1024 
    start:0,
    emitClose:true,
    encoding:null, // 每次读取默认都是buffer
    end:5 // 从0索引读取到5索引
}); // 可读流默认一次读取64k

// rs.on('open',function(fd){ // 此方法是fs可读流中自己实现的
//     console.log(fd); // fs.open('xxx','r') => fd
// })
const arr = []; // 这里需要采用Buffer的concat， 因为字符串拼接可能会导致乱码
rs.on('data',function(chunk){
    console.log('data',chunk)
    arr.push(chunk);
    rs.pause();
})
rs.on('end',function(){
    console.log(Buffer.concat(arr).toString())
})
// rs.on('close',()=>{
//     console.log('close')
// })

setInterval(()=>{
    rs.resume()
},1000)