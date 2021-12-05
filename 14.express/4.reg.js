const express = require('./express');
const app = express();

//  /article/:id  /user/:name
app.get('/article/:id/user/:name',function(req,res){ // 路由中一般不使用next函数
    console.log(req.params); // /article/1/user/zf  => {id:1,name:'zf'}

    res.end(JSON.stringify(req.params))
})

app.listen(3000,function(){
    console.log(`server start 3000`);
})


// [id,name]  [1,zf];
//  let urlStr = '/article/:id/user/:name';
// let keys = []
// let regStr = urlStr.replace(/:([^/]+)/g,function(){
//     keys.push(arguments[1])
//     return '([^/]+)'
// })
// console.log(keys,regStr) // /article/([^/]+)/user/([^/]+)
// let requestUrl = '/article/1/user/zf'
// let [,...values] = requestUrl.match(new RegExp(regStr))
// console.log(values,keys);

// let keys = []
// let reg = pathToRegExp(urlStr,keys)
// console.log(keys,reg)