// cookie每次请求会携带上(中间人可以获取到cookie ， cookie中不能存放敏感信息) localstorage 存放本地（不会每次请求都携带）

const http = require('http');
const uuid = require('uuid');
const querystring = require('querystring')
const crypto = require('crypto')
const session = {}; // 服务端的一段内存, 如果希望服务器挂了 可以将session持久化存储，
const cardName = 'connect.sid'; // 店铺名字
const sign = (content)=>{ // +/_ 作为header传输的时候 会丢失  摘要算法  +  -  =变为空  / _ 
    return crypto.createHmac('sha256','zf').update(content).digest('base64').replace(/\+|\=|\//g,'');
}
const server = http.createServer((req,res)=>{
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

    if(req.url === '/wash'){
        let cardNo = res.cookie.get(cardName,{signed:true}); // 先看一下用户是否访问过我，如果访问过则有卡号
        // 有卡号  服务端确实有这个卡的记录
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        if(cardNo &&session[cardNo]){
            session[cardNo].mny -=20;
            res.end('当前 '+session[cardNo].name+' 有' + session[cardNo].mny)

        }else{
            let cardNo = uuid.v4(); // 短信验证码功能 
            session[cardNo] = {name:'zs',mny:100};
            res.cookie.set(cardName,cardNo,{signed:true,httpOnly:true});
            res.end('当前您有' + session[cardNo].mny)
        }   
    }
}).listen(3000,function(){
    console.log('server start ' + 3000)
})

// session 是基于cookie （session）的问题在于需要服务端存储。 如果想共享登录 （共享存储的数据库）, 如果数据库丢失了 还是会导致验证失败

// jwt   jsonwebtoken  (json令牌)