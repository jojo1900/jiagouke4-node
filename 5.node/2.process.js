
// process

// 写命令行工具的时候  找运行的配置文件  webpack (会去当前目录下查找这个webpack.config.js 文件)
// vite  vite.config,js

// 环境变量的设置是在当前命令中设置的，切换到其他地方执行就不一样了
const path = require('path');
console.log(process.cwd(), path.resolve());  // 如果为了方便 完全可以只使用process.cwd 获取路径
// global上的属性 可以直接访问process    pwd print working directory


// env  webpack 当前的是环境变量 enveriorment

// axios baseURL  npm install cross-env  webpack vite rollup
let baseURL = ''
if (process.env.NODE_ENV === 'dev') {
    baseURL = 'http://localhost:3000'; // 服务器在本地市话是3000
} else {
    baseURL = 'http://39.106.175.189'
}
console.log(baseURL); // 先设置环境变量在使用  在windows下可以使用 set 命令 对于mac export

// set xxx=1
// export xxx=1
// corss-env 

// argv  通过argv属性来获取用户传递的参数 webpack --config a 1 --port 3000 ...

// 默认argv是一个数组 1.可执行文件 2.执行的文件  other 所有用户的参数。。。。


// let args = process.argv.slice(2);


// webpack --watch 
// let r = args.reduce((memo,current,index,arr)=>{
//     if(current.startsWith('--')){
//         memo[current.slice(2)] = arr[index+1];
//     }
//     return memo
// },{})
// console.log(r); // commander 可以实现命令行工具
// 组成一个用户参数列表


const { program } = require('commander'); // 用别人包来解析参数
const pkg = require('./package.json')
program.name('zf');
program.usage('xxx')
program.version(pkg.version)

program.option('-c|--config <x>','config file')
program.option('-p|--port <c>','sever port')
program.command('create [projectName]').action((args)=>{
    console.log(args)
})
// --config --port
program.on('--help',function(){
    console.log('\r\n my help')
})

program.parse(process.argv)
console.log(program.opts()); // commander 内部就是解析process.argv的


// process.env
// process.argv
// process.cwd
// process.nextTick