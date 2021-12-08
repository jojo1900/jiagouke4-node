const http = require('http')
const context = require('./context');
const request = require('./request'); // 源码自己封装的功能
const response = require('./response');
const EventEmitter = require('events')
const Stream = require('stream')

// function create(proto){
//     function Fn(){}
//     Fn.prototype = proto;
//     return new Fn()
// }
class Application extends EventEmitter {
    constructor() {
        super()
        // 为了实现每个应用的上下文对象和request、response对象都是独立的
        this.context = Object.create(context);
        this.request = Object.create(request); // 每个应用的
        this.response = Object.create(response);
        this.middlewares = [];
    }
    use(middleware) {
        this.middlewares.push(middleware);
        // this.context.__proto__ = context
    }
    compose(ctx) {
        const dispatch = (i) => {
            if (i === this.middlewares.length) return Promise.resolve();
            let middleware = this.middlewares[i];
            try {
                // 在执行中间件的时候可能会发生异常
                return Promise.resolve(middleware(ctx, () => dispatch(i + 1)));
            } catch (e) {
                return Promise.reject(e)
            }
        }
        return dispatch(0);
    }
    createContext(req, res) {
        let ctx = Object.create(this.context);
        let request = Object.create(this.request); // 每次请求的
        let response = Object.create(this.response);
        // request是koa自己封装的对象
        ctx.request = request; // 1.
        // req就是原生的req
        ctx.request.req = ctx.req = req;
        ctx.response = response; // 自己封装的
        // 自己封装的有res属性  ctx上有res属性 原生的
        ctx.response.res = ctx.res = res;
        return ctx;
    }
    handleRequest = (req, res) => {
        let ctx = this.createContext(req, res);
        this.compose(ctx).then(() => {

            // ctx.set() 已经设置了 就不用设置了

            if (ctx.body instanceof Stream) {
                // ctx.res.setHeader('Content-Type', 'application/octet-stream')
                ctx.body.pipe(res);
            } else {
                // 拿到最终的ctx.body 将结果响应回去
                res.end(ctx.body);
            }

        }).catch(e => {
            this.emit('error', e)
        })
        // 调用this.fn后 用户内部会给ctx.body赋值



    }
    listen() {
        const server = http.createServer(this.handleRequest);
        server.listen(...arguments)
    }
}
module.exports = Application;


// express 封装req和res 但是是直接就封装到了原始的req和res上
// koa 将封装后的结果放到了request和response 取的时候为了方便创造了一个ctx


// 上下  、 中间件