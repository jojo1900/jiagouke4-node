

// 目录操作 
const fs = require('fs');
const path = require('path')
// fs.mkdir (fs.existsSync -> fs.access -> fs.stat  都可以判断文件的存在性 stat用的比较多)
// fs.rmdir (默认支持递归删除)
// 异步api  
// mkdir('a/b/c',function(err){ // mkdir -p a/b/c
//     console.log(err)
// })


// 删除的过程中需要先删除子目录 在删除 父目录
// dirs = fs.readdirSync('a'); // 只能读取子目录
// dirs = dirs.map((item)=>path.join('a',item)); // a/b  a/e  a/f a/index.js
// dirs.forEach(item=>{
//     let statObj = fs.statSync(item);
//     if(statObj.isDirectory()){
//         fs.rmdirSync(item)
//     }else{
//         fs.unlinkSync(item);
//     }
// });
// fs.rmdirSync('a')

// fs.readdir 读取子目录
// fs.stat 判断状态 isDirectory isFile
// fs.rmdir 删除目录 
// fs.unlink
// fs.acess


// fs.writeFileSync('a/b/c/index.js','aaa')


// （tapble）  目前现在写的是异步串行



let { stat, unlink, readdir, rmdir } = require('fs').promises;
async function rmdir4(dir) {
    let statObj = await stat(dir)  // 如果是文件 删除即可
    if (statObj.isFile()) {
        await unlink(dir)
    } else {
        let dirs = await readdir(dir);
        // 删除完毕儿子后 删除自己
        await Promise.all(dirs.map(item => rmdir4(path.join(dir, item))))
        await rmdir(dir);
    }
}
// rmdir4('a').then(() => {
//     console.log('ok 删除成功')
// }).catch(err=>{
//     console.log(err)
// })

// 异步串行 异步并行 

function rmdir5(dir) {
    let stack = [dir];;
    let index = 0;
    let current;
    while (current = stack[index++]) {
        let stats = fs.statSync(current);
        if (stats.isDirectory()) {
            stack = [...stack, ...fs.readdirSync(current).map(item => path.join(current, item))]
        }
    }
    index = stack.length - 1
    while (index >= 0) {
        let current = stack[index--];
        let stats = fs.statSync(current);
        if (stats.isDirectory()) {
            fs.rmdirSync(current);
        } else {
            fs.unlinkSync(current)
        }
    }
}
rmdir5('a');

// http基础核心应用 （http中的header应用  缓存 压缩  http-server）