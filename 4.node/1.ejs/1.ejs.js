// const ejs = require('ejs');
const fs = require('fs').promises
const path = require('path');

const ejs = {
    async renderFile(filePath, data) {
        let template =  await fs.readFile(filePath,'utf8');
        let head = 'let str = ``;\r\n';
        head += 'with(obj){\r\nstr += `'
        let content = template.replace(/<%=(.+?)%>/g,function(){  
            // <%=xxx%> ->  ${xxx}
            return '${' + arguments[1] +  '}'
        })
        content =  content.replace(/<%(.+?)%>/g,function(){
            return '`\r\n'+arguments[1] + '\r\nstr+=`'
        });
       
        let tail = '`}\r\n return str'
        return new Function('obj',head + content + tail)(data); // 字符串
    }
}
ejs.renderFile(path.resolve(__dirname, 'template.html'), { name: 'zf', age: 12,arr:[1,2,3] }).then(data => {
    console.log(data)
})
// 模板引擎的实现原理 就是 with + new Function  (掌握模板引擎的实现原理 都是这个套路 )
// commonjs 实现原理   

// 1.with解决的是在模板中取值的问题
// 2.new Function 就是让代码传参 ，返回最终的结果

