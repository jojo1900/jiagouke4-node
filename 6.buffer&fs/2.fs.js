const fs = require('fs'); // 文件系统
const path = require('path'); // 处理路径的模块 


// 文件系统中的方法 普遍有两种 一种是同步的 ， 另一种是异步的

// fs.readFile fs.writeFile

fs.readFile(path.resolve(__dirname, 'package.json'), (err, data) => {
    if (err) return console.log(err);
    fs.writeFile(path.resolve(__dirname, 'a.txt'), data, function (err) {
        if (err) return console.log(err);
        console.log('写入成功')
    })
})

// 读取和写入耦合在了一起 , 嵌套问题
// 处理异常也有问题 ，每次都需要处理一下
// 文件不能太大， 如果文件很大超过了内存大小 就无法读取了
// 一般认为 小于64k的都可以采用这种方式


// 可以读取一点写入一点，而不是全部 读出来在写入  采用流的方式 (流中的传递是数据 数据就是二进制的)

// 有起点和终点 有方向
// fs.read() 读取某一部分数据  fs.write()  这俩2api 基本用不到 文件流是基于这两个方法的


const buffer = Buffer.alloc(10); // 用10个字节的大小来实现拷贝大文件
// r 读取  w 写入  a 追加  r+ 以读取为准增加写入 |  w+ 以写入为准增加读取

// 如果文件不存在读取的时候会报错
// 如果写入文件不存在会创建，如果文件中已经有内容了 会清空  读写的区别
fs.open(path.resolve(__dirname, 'a.txt'), 'r', function (err, rfd) { // fd 是一个数字 默认每打开一个文件 + 1
    // fd 可以表示  = 描述我要操作a这个文件 并且要读取
    // 读取a.txt第0个位置开始 将内容写入到buffer中，从buffer的第0个位置写入10个字节
    let readOffset = 0;
    let writeOffset = 0;
    fs.open(path.resolve(__dirname, 'b.txt'), 'w', function (err, wfd) { 
        function next() {
            fs.read(rfd, buffer, 0, 10, readOffset, function (err, bytesRead) {
                if (bytesRead == 0) {
                    fs.close(rfd, function () { })
                    fs.close(wfd, function () { })
                } else {
                    // 数据读取到buffer后。
                    // 做写入操作 写入到这个buffer中 从buffer的第0个位置开始读取，读取10个， 写入到文件的第0个位置
                    fs.write(wfd, buffer, 0, bytesRead, writeOffset, function (err, written) {
                        readOffset += written;
                        writeOffset += written;
                        next();
                    })
                }
            });
        }
        next();
    })
})
// 0o666 文件操作模式 文件的权限 chmod -R 777  2写入+4读取+1执行  -> 777 自己  自己家的人 别人家的人
// 同步代码迭代可以用while 异步需要递归


// 这个代码 写和读取耦合在了一起 （回调可以先考虑采用promise减缓） 读取和写入 没有相应的关系
// 采用发布订阅的模式来进行解耦合。 文件中自己实现了文件流
