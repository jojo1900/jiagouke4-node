const fs = require('fs');
const path = require('path');
const readStream = require('./readStream');
// const rs = fs.createReadStream(path.resolve(__dirname, 'a.txt'));
const rs = new readStream();

const arr = [];

rs.on('open', (fd) => {
  console.log('文件打开,文件描述符为:', fd);
});

rs.on('data', (chunk) => {
  const buff = Buffer.from(chunk);
  arr.push(buff);
});

rs.on('end', () => {
  console.log('文件操作完毕，文件内容为:', Buffer.concat(arr));
});

rs.on('close', () => {
  console.log('文件已关闭');
});
