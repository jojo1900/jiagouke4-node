// 全局属性 就是可以直接访问的属性 module,exports,require,__dirname,__filename 并不属于global的属性


// console.log(global)  // window.window

// console.log(process); // 当前运行的进程
// console.log(global.Buffer); // 二进制对象

//console.log(process.platform); // win32 node中可能有很多系统级别的配置文件 .npmrc   mac drawin
// setImmediate setTimeout
// 表现行文是异步的 表示当前执行脚本后立即执行的代码

// Promise.resolve().then(() => {
//     process.nextTick(() => {
//         console.log('nextTick')
//     })
//     console.log('then')
// })



// promise里面的then  注册多个then   中途还可以执行其他脚本  




// node中的事件环  （早期node中的事件环和浏览器执行的机制是不同的， 最新版本的node执行和浏览器表现行为是一致的  执行表现行为是一样的）
// node中底层libuv库 实现了一套事件环机制



// platform 进程所运行的平台
// nextTick
// cwd
// env


// 1.进程执行的时候 会先执行同步代码
// 2.同步代码执行完毕后执行nextTick队列 [nextTick,nextTick]
// 3.清空微任务队列

// -------每取一个宏任务都会清空微任务-------
// 4. 清空微任务后会看定时器队列中是否有完成的， 有的话拿出来依次执行 (如果没有定时器，直接走到poll阶段)
// 5. 定时器任务完成后，会走到poll阶段里，里面包含一些i/o 操作的回调，同样依次执行
// 6. poll清空后会查找check阶段中是否有回调，有的话会优先执行，执行完毕后，按照上述流程回到poll阶段中
// 7.如果check阶段中没有任务 就会再poll阶段中阻塞，等待定时器到达时间后再次执行 ， 如果什么都没有了进程结束了


// 定时器是时间到达了才放到我们的队列中 (放入的是回调)

// setTimeout(() => { //  在全局上下文中放入的定时和setImmediate执行顺序是不确定的 
//     console.log('settimeout')
// })
// setImmediate(() => { // check 
//     console.log('check')
// })
// let fs = require('fs');

// fs.readFile('./a.txt', () => { // poll 

//     console.log('ok')
//     setTimeout(() => {
//         Promise.resolve().then(() => { // 微任任务
//             console.log('promise1')
//             setTimeout(() => {
//                 console.log('ast')
//             })
//         })
//     })
//     setTimeout(() => { // timer 
//         console.log('settimeout')

//         Promise.resolve().then(() => {
//             console.log('promise12')
//         })
//     })
//     setImmediate(() => { // check 
//         console.log('check')
//     })
// })

// ok promise1 check  settimeout  promise12
// 每当执行一个宏任务前 都会清空微任务
