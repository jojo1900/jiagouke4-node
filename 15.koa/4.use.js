const Koa = require('koa');
const fs = require('fs')
const path = require('path');
const Router = require('@koa/router'); // @koa 都是内部人员写的
const body = require('koa-bodyparser');
const staitc = require('koa-static');
const router = new Router(); // express.Router();

const app = new Koa();
// 放访问/form的时候 返回一个表单 表单能提交 /login  我们需要解析数据

function bodyParser() { // 插件永远是一个函数 函数返回一个中间件函数 koa-bodyparser
    return async (ctx, next) => {
        ctx.request.body = await new Promise((resolve, reject) => {
            let arr = [];
            // http req.on('data)  可读流 
            ctx.req.on('data', function (data) {
                arr.push(data);
            })
            ctx.req.on('end', function () {
                console.log(Buffer.concat(arr).toString())
                resolve(Buffer.concat(arr).toString())
            })
        });
        // 先解析请求体之后继续执行即可
        await next();
    }
}

app.use(body())
app.use(router.routes()); // 返回一个路由的中间件
app.use(staitc(__dirname)); // express.static()


router.get('/form', async (ctx, next) => {
    ctx.type = 'text/html;charset=utf8';
    ctx.body = fs.createReadStream(path.resolve(__dirname, 'form.html'));
})
router.post('/login', async (ctx, next) => {
    ctx.body = ctx.request.body
})
// 请求来了会命中中间件
// app.use(async (ctx, next) => {
//     if (ctx.path === '/form' && ctx.method === 'GET') {
//         ctx.type = 'text/html;charset=utf8';
//         ctx.body = fs.createReadStream(path.resolve(__dirname, 'form.html'));
//     } else {
//         await next();

//     }
// })

// app.use(async (ctx, next) => {
//     // 用户提交信息了
//     if (ctx.path === '/login' && ctx.method === 'POST') {
//         ctx.body =  ctx.request.body
//     } else {
//         await next();
//     }
// })
app.listen(3000);