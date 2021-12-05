const express = require('./express');

const app = express();

// 1.中间件的存在价值 1） 可以决定是否向下执行 （可以向下走就表示跳过了，处理过了） 2) 添加额外的功能 3) 处理额外的逻辑

app.post('/',function(req,res,next){ // 路由的中间件函数 在访问到真实逻辑之前 （走的处理过程）
    console.log(1);
    next();
},function(req,res,next){
    console.log(11);
    next();
},function(req,res,next){
    console.log(111);
    next();
},function(req,res,next){
    console.log(1111);
    next();
})
app.get('/xxx',function(req,res){
    console.log(2)
    res.end('end')
})

// app.route('/xxx').post(function(){}).delete(()=>{}).get()

app.listen(3000,function(){
    console.log(`server start 3000`);
})

