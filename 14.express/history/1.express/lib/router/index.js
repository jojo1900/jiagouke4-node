const url = require('url')
function Router() {
    this.stack = [
        // {
        //     method: 'all', // 所有方法都可以匹配到
        //     pathname: '*', // 任何路径都能匹配
        //     handler(req, res) {
        //         res.end(`Cannot ${req.method} ${req.url}`);
        //     }
        // }
    ]
}
Router.prototype.get = function (pathname, handler) {
    this.stack.push({
        method: 'get',
        pathname,
        handler
    });
}
Router.prototype.handle = function(req,res,done){
    let { pathname } = url.parse(req.url);
    let method = req.method.toLowerCase();
    for(let i = 0; i <this.stack.length;i++){
        let { method: routeMethod, pathname: routePath, handler } = this.stack[i];
        if(routeMethod === method && pathname == routePath){
            return handler(req, res)
        }
    }
    done();
    // this.stack[0].handler(req, res)
}
module.exports = Router;


