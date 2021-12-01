// 实现多语言的方式有几种？ 请求头中可以切换语言

const http = require('http');

let defaultLanguage = 'es';
let mapping = { // 多语言都是要有映射关系的
    'es':"hello world",
    'zh-CN':'你好,世界'
}

const server = http.createServer((req,res)=>{
    let language = req.headers['accept-language'];

    if(language){
        // en,zh-CN;q=0.9
        language  = language.split(',').map(lan=>{
            let [l,q='q=1'] = lan.split(';');

            return {lan:l,q:q.split('=')[1]}
        }).sort((a,b)=>b.q - a.q);
        
        for(let i = 0; i < language.length;i++){
            let current = language[i].lan;
            if(mapping[current]){
                res.end(mapping[current]);
                return;
            }
        }
    }
    res.end(mapping[defaultLanguage])
    // config => 中文 -》 英文

}).listen(3000);

