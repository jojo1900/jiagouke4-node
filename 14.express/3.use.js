const express = require('./express');
const app = express();
// 所有路径为/开头的都能匹配到   
// express中的中间件是不考虑请求方法的 只要路径能匹配就会执行对应的函数
// app.use('/',function(req,res,next){  // 中间件一般都在路由的前面
//     console.log('*1*');
//     next();
//     console.log('*8*');
// },function(req,res,next){  // 中间件一般都在路由的前面
//     console.log('*2*');
//     next();
//     console.log('*7*');
// })
app.use('/', function (req, res, next) {  // 路径不写就是/ 
    //之前调用接口 基于回调的 
    console.log('*1*');
    next(); // 在next中传递参数就意味着错误了，会跳过所有的中间件找到错误处理中间件执行
    console.log('*2*');
})
app.use('/', function (req, res, next) {  // 路径不写就是/ 
    //之前调用接口 基于回调的 
    console.log('*3*');
    next();
    console.log('*4*');
})
app.use('/', function (req, res, next) {  // 路径不写就是/ 
    //之前调用接口 基于回调的 
    console.log('*5*');
    next();
    console.log('*6*');
})
// app.use('/a',function(req,res,next){  // 路径以某个开头才能匹配到对应的中间件
//     console.log('*4*');
//     next();
//     console.log('*5*');
// })

app.get('/', function (req, res,next) {
    next('error');
    // res.end('a')
})
app.get('/a', function (req, res,next) {
    res.end('a')
})
app.get('/b', function (req, res) {
    res.end('b')
})

// 类似于promise.catch
app.use((err,req,res,next)=>{ // 错误处理中间件 有4个参数， 比普通的中间多一个
    console.log('error1')
    next('error2');
})
app.use((err,req,res,next)=>{ // 错误处理中间件 有4个参数， 比普通的中间多一个
    console.log(err)
    next();
})
app.get('/',(req,res,next)=>{ // 错误处理中间件 有4个参数， 比普通的中间多一个
   res.end('ok')
})
app.listen(3000);


