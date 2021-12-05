const http = require('http');
const Router = require('./router')
function Application() {
    this.router = new Router();
}
Application.prototype.get = function (pathname, ...handlers) { // 用户的get
    this.router.get(pathname,handlers);

}
Application.prototype.listen = function () { // 用户的listen
    const server = http.createServer((req, res) => {
        function done(){
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        this.router.handle(req, res,done)
    });
    server.listen(...arguments)
}
module.exports = Application


