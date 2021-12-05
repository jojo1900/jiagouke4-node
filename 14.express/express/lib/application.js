const http = require('http');
const Router = require('./router')
function Application() { // 一创建应用 就给了个路由系统
   
}
Application.prototype.lazy_route = function(){
    if(!this.router){
        this.router = new Router(); // 将路由的创建做了一个懒加载

        this.use((req, res, next) => {
            res.send = function (data) {
                if (typeof data == 'object') {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data))
                }else if(Buffer.isBuffer(data) || typeof data === 'string'){
                    res.end(data);
                }else if(typeof data === 'number') {
                    res.statusCode = data; // 状态码
                    res.end(statuses[data]); // send只能调用一次
                }
            }
            res.sendFile = function(fielpath){
                // mime设置返回的类型
                res.setHeader('Content-Type',require('mime').getType(fielpath) + ';charset=utf-8')
                require('fs').createReadStream(fielpath).pipe(res); // res.end()
            }
            next(); // 扩展好后 ，后续的路由或者中间件 都可以使用扩展后的方法
        })


    }
}

// 源码中依赖了一个库 methods  第三方模块 是express中使用的
// 别人依赖了这个包，我可以直接使用这个包  幽灵依赖  
// A (C) B  可以直接使用c  有一天a不用c 就挂了
const methods = require('methods');

Application.prototype.use = function(){
    this.lazy_route(); // 懒加载路由
    this.router.use(...arguments); // 交给路由系统来处处
}


methods.forEach((method)=>{
    Application.prototype[method] = function (pathname, ...handlers) { // 用户的get
        this.lazy_route();
        this.router[method](pathname,handlers);
    }
})

Application.prototype.listen = function () { // 用户的listen
    const server = http.createServer((req, res) => {
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        this.lazy_route();
        this.router.handle(req, res,done)
    });
    server.listen(...arguments)
}
module.exports = Application


