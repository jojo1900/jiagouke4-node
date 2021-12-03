
const http = require('http');
const querystring = require('querystring');
const crpto =require('crypto')

// cookie 就是一个header 服务可以设置， 浏览器也可以设置


const sign = (content)=>{ // +/_ 作为header传输的时候 会丢失  摘要算法  +  -  =变为空  / _ 
    return crpto.createHmac('sha256','zf').update(content).digest('base64').replace(/\+|\=|\//g,'');
}
const server = http.createServer((req, res) => {
    res.cookie = {
        _cookies:[], // 存储每次设置的cookie
        set(key, value, options = {}) {
            let args = [];
            if(options.domain){
                args.push(`domain=${options.domain}`); // 可以限制在哪个域下生效
            }
            if(options.path){
                args.push(`path=${options.path}`); // path可以限制设置的路径和读取的路径  只有在某个路径下才可以访问
            }
            if(typeof options.maxAge === 'number'){ // 最大cookie存活时间
                args.push(`max-age=${options.maxAge}`)
            }
            if(options.httpOnly){  // 不让客户端通过代码的方式来篡改
                args.push(`httpOnly=${options.httpOnly}`)
            }
            if(args.length > 0){
                this._cookies.push(`${key}=${value}; ${args.join('; ')}`);
            }else{
                this._cookies.push(`${key}=${value}`);
            }
            if(options.signed){
                this._cookies.push(`${key}.sign=${sign(`${key}=${value}`)}`)
            }
            res.setHeader('Set-Cookie',this._cookies)
        },
        get(key,options= {}) {
            const cookieObj =  querystring.parse(req.headers['cookie'],'; ','=') ||{}; // name=zf; age=12  qs
            if(options.signed){
                let oldSign = cookieObj[key+'.sign'];
                let newSign = sign(`${key}=${cookieObj[key]}`); // 摘要算法 相同内容 相同的秘钥摘要出的结果是相同的
                // 相同说明用户没有更改过
                if(oldSign == newSign){
                    return cookieObj[key]
                }else{
                    return undefined;
                }
            }
            return cookieObj[key];
        }
    }
    if (req.url === '/read') {
        return res.end(res.cookie.get('name',{signed:true}) || 'empty')
    }
    if (req.url === '/write/read') {
        let cookies = req.headers['cookie'] || 'empty';// name=zf; age=12
        res.end(cookies)
        return
    }
    // req.cookie.get()
    // res.cookie.set('key',value)

    // 对cookie做一些安全认证 签名 给cookie进行签名
    if (req.url === '/write') {
        // res.setHeader('Set-Cookie',['name=zf; httpOnly=true','age=12']);
        res.cookie.set('name', 'jw', { httpOnly:true ,signed:true});
        // res.cookie.set('name', 'jw1', { domain:'a.zf.cn' }); // 基本遇不到
        res.cookie.set('age', 20);
        res.end('write ok')
        return;
    }
}); // 图解http

server.listen(3000);