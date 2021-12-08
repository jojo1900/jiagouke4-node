const http = require('http')
const context = require('./context');
const request = require('./request'); // 源码自己封装的功能
const response = require('./response');

// function create(proto){
//     function Fn(){}
//     Fn.prototype = proto;
//     return new Fn()
// }
class Application {
    constructor() {
        // 为了实现每个应用的上下文对象和request、response对象都是独立的
        this.context = Object.create(context);
        this.request = Object.create(request); // 每个应用的
        this.response = Object.create(response)
    }
    use(handleRequest) {
        this.fn = handleRequest;
        // this.context.__proto__ = context
    }
    createContext(req, res) {
        let ctx = Object.create(this.context);
        let request = Object.create(this.request); // 每次请求的
        let response = Object.create(this.response);

        // request是koa自己封装的对象
        ctx.request = request; // 1.
        // req就是原生的req
        ctx.request.req =  ctx.req= req;

        ctx.response = response; // 自己封装的
        // 自己封装的有res属性  ctx上有res属性 原生的
        ctx.response.res = ctx.res = res;

        return ctx;
    }
    handleRequest = (req, res) => {
        let ctx = this.createContext(req, res);
        this.fn(ctx);
        // 调用this.fn后 用户内部会给ctx.body赋值

        // 拿到最终的ctx.body 将结果响应回去
        res.end(ctx.body);

    }
    listen() {
        const server = http.createServer(this.handleRequest);
        server.listen(...arguments)
    }
}
module.exports = Application;


// express 封装req和res 但是是直接就封装到了原始的req和res上
// koa 将封装后的结果放到了request和response 取的时候为了方便创造了一个ctx