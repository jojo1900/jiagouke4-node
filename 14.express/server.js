const express = require('./express');
const user = require('./routes/user');
const article = require('./routes/article');
const statuses = require('statuses')
const mime = require('mime')
const path = require('path')
const app = express();
const fs = require('fs')

function static(dirname){ // 中间件插件  插件就是一个函数
    return (req,res,next)=>{
        let filepath = path.join(dirname,req.url); // 每次拼接一下
        fs.stat(filepath,function(err,statObj){
            if(err){
                next(); // 能处理就处理 处理不了就跳过
            }else{
                if(statObj.isDirectory()){
                    // 找目录下的index.html
                }else{
                    fs.createReadStream(filepath).pipe(res);
                }
            }
        })
    }
}
app.use(static(__dirname))
app.use(static(path.join(__dirname,'history')))
// 扩展

// 有一个用户相关的功能  add remove

app.use('/user', user); // express.Router() => function(req,res,next){}
app.use('/article', article)

// 文章相关的功能  add remove


app.listen(3000, function () {
    console.log('server start 3000')
})
