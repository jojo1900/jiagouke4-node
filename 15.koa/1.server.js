const Koa = require('./koa');
const app = new Koa(); // 产生一个应用   app()
// ctx.header // 获取请求头 设置响应头

// ctx. request/response

// ctx.request.xxx
// ctx.response.xxx

// ctx 是对req和res的封装， 针对req对象扩展了一个request对象，针对res对象扩展了一个response对象 

// 可以通过ctx对象访问request和response 也可以访问原生的req和res

app.use((ctx)=>{  // ctx 上下文对象 用于扩展req和res对象  ctx.body
    console.log(ctx.request.query); // req.path
    console.log(ctx.request.req.url); // 可以通过koa中封装的request对象获取原生的req对象
    console.log(ctx.req.url); 
    console.log(ctx.path); // ctx.path 会代理koa中request的属性
    // ctx.body = 'ok'// res.end()

    // ctx.body = 'hello';
    // ctx.body = 'world';
    ctx.body = 'zf'
    ctx.body = 'world';
    ctx.body = 'hello';


});

app.listen(3000,()=>{ // http.createServer
    console.log('server start 3000')
})

// 1.先实现上下文对象 
// 2.实现中间件串联的效果
// 3.koa中间错误处理  promise.catch


// 每次的请求上下文能是同一个吗？ context 每个应用最起码得有一个
// 我们期望 每次请求使用的上下文也是独一无二的
