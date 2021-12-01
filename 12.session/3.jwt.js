const http = require('http');
const crpto = require('crypto');
// const jwt = require('jwt-simple'); // jsonwebtoken
// jwt 的核心就是生成令牌  验证令牌
let secret = 'zf'

const jwt = {
    base64urlEscape(str) { // 这几个字符在url中有特殊含义
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
    },
    sign(content, secret) {
       return  this.base64urlEscape(crpto.createHmac('sha256',secret).update(content).digest('base64'))
    },
    toBase64(content) {
        if (typeof content == 'object') {
            content = JSON.stringify(content)
        }
        return this.base64urlEscape(Buffer.from(content).toString('base64'));
    },
    encode(payload, secret) {
        const part1 = this.toBase64({ "typ": "JWT", "alg": "HS256" })
        const part2 = this.toBase64(payload)
        const part3 = this.sign([part1, part2].join('.'), secret);
        return part1 + '.' + part2 + '.' + part3

    },
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    decode(token,secret) {
        let [part1,part2,part3] = token.split('.');
        const newPart3  = this.sign([part1, part2].join('.'), secret);
        if(newPart3 === part3){ // 一样就说明没有篡改
            // part3 是被处理过  + = /的
            return JSON.parse(Buffer.from(this.base64urlUnescape(part2),'base64').toString('utf8'))
        }else{
            throw new Error('抱歉 令牌不对')
        }
    }   
}
let server = http.createServer((req, res) => {
    if (req.url === '/login') {
        let token = jwt.encode({
            name: 'zs',
            id: 123,
            // expires: 100123
        }, secret);
        res.end(JSON.stringify({
            err: 0,
            token,
            data: '登录成功'
        }))
    } else if (req.url === '/validate') {
        let token = req.headers['authorization']; // jwt token    authorization：Bearer token
        if (token) {
            let [, t] = token.split(' ');
            try {
                let payload = jwt.decode(t, secret); // 做签名比对
                res.end(JSON.stringify({
                    err: 0,
                    data: payload
                }));
                //
            } catch (e) {
                res.statusCode = 401;
                res.end(JSON.stringify({
                    err: 1,
                    data: '用户校验失败'
                }))
            }
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
});


server.listen(3000);

// 多语言  + 防盗链  tcp + http + https  周日express 
// 周三koa  周五mongoose  
