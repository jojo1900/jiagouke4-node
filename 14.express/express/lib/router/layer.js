function Layer(path,handler) {
    this.path = path;
    this.handler = handler;
}
Layer.prototype.match = function(pathname){
    // 都可以在这里维护 路径的匹配流程
    return this.path === pathname
}
Layer.prototype.handle_request = function(req,res,next){
    // todo..
    return this.handler(req,res,next)
}
module.exports = Layer;