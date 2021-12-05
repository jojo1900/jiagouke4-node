const http = require('http');

const Router = require('./router')
function Application() { // 应用和路由也是耦合在一起的
//    this.router = [
//         {
//             method: 'all', // 所有方法都可以匹配到
//             pathname: '*', // 任何路径都能匹配
//             handler(req, res) {
//                 res.end(`Cannot ${req.method} ${req.url}`);
//             }
//         }
//     ]
    this.router = new Router(); // 创造一个路由系统
}
Application.prototype.get = function (pathname, handler) {
    // this.router.push({
    //     method: 'get',
    //     pathname,
    //     handler
    // })
    this.router.get(pathname,handler);

}
Application.prototype.listen = function () {  // createServer listen
    const server = http.createServer((req, res) => {

        // 这里我们稍作优化 当路由系统处理不了 应用返回一个找不到
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`);
        }

        this.router.handle(req, res,done)
        // let { pathname } = url.parse(req.url);
        // let method = req.method.toLowerCase();
        // for (let i = 1; i < this.router.length; i++) {
        //     let { method: routeMethod, pathname: routePath, handler } = this.router[i];
        //     if (pathname === routePath && routeMethod === method) {
        //         return handler(req, res)
        //     }
        // }
        // this.router[0].handler(req, res)
    });
    server.listen(...arguments)
}
module.exports = Application


