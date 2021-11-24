const ReadStream = require('./readstream');
const WriteStream = require('./writeStream');
const path = require('path');


const rs = new ReadStream(path.resolve(__dirname,'a.txt'),{
    highWaterMark:4 // 64k
});

const ws = new WriteStream(path.resolve(__dirname,'b.txt'),{
    highWaterMark:1 // 16k
})

// pipe 可以实现 从 a->b  效果是读一点写一点 是异步的
rs.pipe(ws);

// 读流 （on('data')  on('end')） -》 写流 (ws.write  ws.end) 

// 我们可以自己实现读流和写流