const url = require('url');
const Layer = require('./layer')
const Route = require('./route')
const methods = require('methods')
function Router() {
    this.stack = []
}
Router.prototype.use = function (path, handler) { // 有可能用户只传递了一个回调
    // 如果handlers数组中有值 说明用户传递了handler 
    if (typeof handler !== 'function') { // 没有传递第二个参数
        handler = path; // app.use(fn)  => app.use('/',fn)
        path = '/'
    }
    // 如果只传递了一个参数 ， Array.from(arguments).slice(1)就是空数组
    let handlers = Array.from(arguments).slice(1); // 除了第一个的组成数组

    if (handlers.length == 0) {
        handlers = [handler]; // 防止 / app.use(fn)
    }

    handlers.forEach(handler => {
        let layer = new Layer(path, handler); // 中间件中的layer 没有route属性
        layer.route = undefined; // 没有route
        this.stack.push(layer);
    });
}
methods.forEach((method) => {
    Router.prototype[method] = function (pathname, handlers) {
        const route = new Route();
        const layer = new Layer(pathname, route.dispatch.bind(route));// 创建一个layer
        layer.route = route; // 标识每一个路由都配备了一个route实例
        this.stack.push(layer);
        route[method](handlers); // 让route去存放用户真实的回调
        // this.stack.push({
        //     method: 'get',
        //     pathname,
        //     handler
        // });
    }
})

Router.prototype.handle = function (req, res, out) {
    let { pathname } = url.parse(req.url);
    let method = req.method.toLowerCase();
    // 请求到来后 迭代外层的栈 
    let idx = 0;
    const next = (err) => { // 先执行第一个 ，将第二个执行逻辑传入到dispatch中，dispatch调用此回调就从第一个走到第二个
        if (idx >= this.stack.length) return out()
        let layer = this.stack[idx++];


        if (err) {
            if(!layer.route){
                layer.handle_error(err,req,res,next); // 内部会看一下是不是错误处理中间
            }else{
                next(err); // 如果不是中间件 就继续找下面的 
            }
        } else {
            // 路由和中间件的区别在于 中间件 不需要匹配方法，只要路径匹配即可

            // 无论路由还是中间件路径要先匹配成功, 如果是路由还要匹配方法
            if (layer.match(pathname)) {
                // 中间件参数不是4个的话 会走正常中间件
                if (!layer.route) { // 中间件
                    if(layer.handler.length !== 4){
                        layer.handle_request(req, res, next); // 调用中间件绑定的函数
                    }else{
                        next();
                    }
                } else {
                    if (layer.route.match_method(req.method.toLowerCase())) {
                        layer.handle_request(req, res, next); // 调用dispatch方法
                    } else {
                        next();
                    }
                }
            } else {
                next();

            }
        }


    }
    next();

}
module.exports = Router;



// 1） 创建应用会有一个路由系统 （存放的是一层层的）  每一层中存放的 是路径和方法
// 2)  路由系统中的每一层我们都提供一个Route的实例 ， layer.route = new Route
// 3) Route是一个类，每一个路由都有这个实例，实例中会创造一个stack， 用来存放用户注册的回调 （我们把存的回调也封装成layer） 里面的layer不需要在意路径
// 每一个layer需要存放方法 
// 外层的stack 需要匹配路径  ， 里层stack 需要匹配方法

