Promise.resolve().then(() => {
    console.log('then1');
     Promise.resolve().then(() => {
        console.log('then1-1');
        // 调用x.then
        //  x.then()
        // 在ECMASCRIPT中 如果then中的回调返回了一个promise ，那么会自动再次产生一个then
        return Promise.resolve();  //then中的回调返回一个promise 会等待这个promise完成 Promise.resolve().then().then()
    }).then(() => {
        console.log('then1-2')
    })
})
    .then(() => {
        console.log('then2');
        return undefined
    })
    .then(() => {
        console.log('then3');
    })
    .then(() => {
        console.log('then4');
    })
    .then(() => {
        console.log('then5');
    })
// then1   then1-1 (在执行then-1的时候 需要等待返回的promise的状态)  then2

//  [空的x.then,then3]
// [ 空的x.then,then3，空then，then4，then1-2'，‘then5]  

// 微任务执行的过程 ： 先进的先出，当前微任务在执行的过程中会将产生的微任务放到当前微任务队列的尾部

//  then1  打印后 直接当前的promise就成功了 ，并且注册了一个then1-1的promise
//  then1 成功后注册了 then2

// then1   then-1-1  then2  then3 then4   then1-2 then5
// [then1-2,'then4']


// ecmascript中 promise的多余特点 1)Promise.resolve(promise的时候) 会直接将这个promise解析出来 
//                               2)一个promise返回一个promise 会产生两个then





// 第一天 将的promoise （高阶函数 （函数柯里化 - 将函数的执行逻辑更加细化 isType-> isString） 
// 反柯里化 （期望将一个函数的使用范围变大  Object.prototype.toString => toString()））
// 高阶函数  防抖函数（多次执行 最终只执行一次） 节流函数 (一直执行某个功能，但是按照频率触发) 基于高阶函数的

// promise （要求得掌握这个promise的实现机制  then链如何实现的  ）
// geneator (知道基本实现原理  co的实现原理 要求会写  )  处理异步还是要基于 promise

// promise Promise.resolve promise.finally Promise.all Promise.race promifiy  abort  延迟对象
// async + await = geneator + co (co实现原理)

// 回调函数 -》 类似同步的代码（执行的时候依旧是异步的）  promise缺陷就是依旧基于回调的，难免还是会出现嵌套问题  


// new Promise(()=>{
//     resolve()
// }).then(()=>{
//     // ---------  返回一个空的promise  return  new Promise(()=>{})
// }).then(()=>{
//     console.log('last')
// }).catch(()=>{
//     console.log('catch')
// })


// 事件环  每次执行会清空微任务队列  取出一个宏任务执行 
// 微任务 promise.then  MutationObserver (process.nextTick) 
// 宏任务 setTimeout setImmediate ui渲染 script执行 。。。。 （requestFrameAnimation, requestIdleClalback）

// 异步的
// （requestFrameAnimation, requestIdleClalback） 这两个和ui渲染有关 （渲染是在微任务之后，其他的宏任务也是在微任务之后） 这俩方法就暂且算成宏任务 


// node中概念 能做什么事。。。 ssr  中间层 工具
// node中的global  和 浏览器的window 
// node中实现了模块化机制  会给每个文件增加一个函数 函数中有五个参数 exports module require __dirname __filename



// 核心模块 fs (readFileSync exitsSync) path (resolve,join,dirname) vm (runInThisContext, eval , newFunction 在模板引擎中经常使用)

// new Function 在模板引擎中的使用是非常多的 （实现一个自己的模板引擎）

// vue 中的  {{}} 模板引擎  `${}`  ejs jade underscore handlebar pug nunjuncks。。