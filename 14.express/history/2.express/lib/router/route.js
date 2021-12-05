
const Layer = require('./layer')
function Route() {
    this.stack = [];
}
Route.prototype.dispatch = function(req,res,out){ // 里层想走到外层的下一个layer 就调用out
    let idx = 0;
    const next = () =>{
        if(idx >= this.stack.length) return out();
        let layer = this.stack[idx++];
        if(layer.method === req.method.toLowerCase()){
            layer.handler(req,res,next); // 将执行下一次的逻辑传递给用户 用户调用next，会在stack中取出下一个
        }else{
            next();
        }
    }
    next();

    // 我们是否执行下一个 完全看用户是否调用了next方法
}
Route.prototype.get = function(handlers){
    handlers.forEach(handler=>{ // 用户传入的函数
        let layer = new Layer('无用',handler)
        layer.method = 'get';
        this.stack.push(layer); // 里层的route存放的是用户的真实回调， 并且每个layer上有标记对应的方法
    })
}
module.exports = Route;


// 外层的stack  存的是 路径对应的dispatch方法
// 里层的stack  存的是 用户的回调

// 稍后匹配的时候 会执行dispatch方法，执行里层对应的用户回调