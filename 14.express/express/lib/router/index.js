const url = require('url')
function Router() {
    this.stack = [ ]
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
}
module.exports = Router;


