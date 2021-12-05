
const Layer = require('./layer')
const methods = require('methods');
function Route() {
    this.stack = [];
    this.methods = {}; // 用来标识route中有哪些方法
}
Route.prototype.dispatch = function (req, res, out) { // 里层想走到外层的下一个layer 就调用out
    let idx = 0;
    const next = (err) => {
        if (idx >= this.stack.length) return out(err);
        let layer = this.stack[idx++];
        if (layer.method === req.method.toLowerCase()) {
            layer.handle_request(req, res, next); // 将执行下一次的逻辑传递给用户 用户调用next，会在stack中取出下一个
        } else {
            next();
        }
    }
    next();
    // 我们是否执行下一个 完全看用户是否调用了next方法
}
Route.prototype.match_method = function(method){
    return this.methods[method]
}
methods.forEach(method => {
    Route.prototype[method] = function (handlers) {
        handlers.forEach(handler => { // 用户传入的函数
            let layer = new Layer('/', handler)
            layer.method = method;
            this.stack.push(layer); // 里层的route存放的是用户的真实回调， 并且每个layer上有标记对应的方法
        });
        this.methods[method] = true; // 增加存储的方法标识
    }
})

module.exports = Route;




// 外层的stack  存的是 路径对应的dispatch方法
// 里层的stack  存的是 用户的回调

// 稍后匹配的时候 会执行dispatch方法，执行里层对应的用户回调