const Koa = require('./koa');
const app = new Koa();
const fs = require('fs')
// 内部koa 会将所有的中间件组成一个大的promoise 
// 在koa中处理异步逻辑 需要全部包装成promoise来处理
// koa中next前面必须要有 await 或者 return ，否则当前的中间件不会等待下一个执行完毕

let sleep = (n) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, n)
    })
}
app.use((ctx) => {
    // res.sendFile
    ctx.res.setHeader('Content-Type','application/json')
    ctx.body = fs.createReadStream('./package.json')
})
// app.use((ctx, next) => { // koa可以利用这种设计统计时间
//     console.time('timer')
//     // throw new Error('ok')
//     console.timeEnd('timer')
// })

app.on('error', function (err) {
    console.log(err, 21)
})



// app.use( async (ctx,next)=>{
//     console.log(1); // 1.

//     ctx.body = '1'
//     await next();
//     console.log(2) // 3
//     ctx.body = '2'
// })
// app.use(async (ctx,next)=>{
//     console.log(3); // 2
//     ctx.body = '3'
//     await sleep(1000);
//     await next();
//     console.log(4)
//     ctx.body = '4'
// })
// app.use(async (ctx,next)=>{
//     console.log(5);
//     ctx.body = '5'
//     await next();
//     console.log(6)
//     ctx.body = '6'
// })
app.listen(3000, function () {
    console.log('server start 3000')
});