function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
}
Layer.prototype.match = function (pathname) {

    // 如果是路由 恒等是可以的 /a  /a
    // 中间件只要是/ 就都满足
    // 中间件 /a   访问的是/a/b  也是可以的

    if (this.path === pathname) {
        return true; // 写的路径和访问的路径一致都是可以访问的
    }
    if (!this.route) { // 中间件
        if (this.path == '/') {
            return true
        }
        // /a/b    /a/
        return pathname.startsWith(this.path + '/')
    }

    // 都可以在这里维护 路径的匹配流程
    return false;
}
Layer.prototype.handle_error = function(err,req,res,next){
    if(this.handler.length === 4){ // 错误中间件
        this.handler(err,req,res,next)
    }else{
        next(err); // 不是错误就向下执行
    }
}
Layer.prototype.handle_request = function (req, res, next) {
    // todo..
    return this.handler(req, res, next)
}
module.exports = Layer;