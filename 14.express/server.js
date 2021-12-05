const express = require('./express');
const user = require('./routes/user');
const article = require('./routes/article')
const app = express();

// 有一个用户相关的功能  add remove



app.use('/user',user); // express.Router() => function(req,res,next){}
app.use('/article',article)  

// 文章相关的功能  add remove


app.listen(3000,function(){
    console.log('server start 3000')
})