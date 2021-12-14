// server 就是我们的核心启动静态服务的入口
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const os = require('os'); // 内置模块
const { createReadStream, readFileSync, statSync } = require('fs')
const crpto = require('crypto');
const zlib = require('zlib')
//----------------------------------------
const chalk = require('chalk');
const mime = require('mime');
const ejs = require('ejs');
// let {pathname,query} = url.parse('/abc?a=1',true); // true 表示将查询参数转换成对象
let networkInterfaces = Object.values(os.networkInterfaces()).flat().filter(item => item.family == 'IPv4')
let tempalte = readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8')
class Server {
    constructor(options) {
        this.port = options.port;
        this.directory = options.directory
        this.networkInterfaces = networkInterfaces;
        this.tempalte = tempalte;
        this.start();
    }
    request(req,res){
        console.log(req.url, req.method);
        if(req.url === '/user' && req.method.toLowerCase()=== 'post'){
            // 处理请求 
            // res.setHeader('Set-Cookie','name=1'); // 服务端给客户端设置一个cookie 
            // 下次客户端访问的时候会携带这个cookie   cookie是用来识别身份的
            res.end(JSON.stringify({name:'zf',age:20}));
            return true
        }
        return false;
    }
    handleRequest = async (req, res) => { // 保证this 永远指向当前的自己的server实例
        // 处理文件夹路径 最终展现给我们
        // 协议：//（用户名：密码）域名：端口号/路径：查询参数：hash值
        // https://xxx:xxx@gitee.com:443/xxx?a=1#xxx
        // 等价于 * 就是运行任何访问 但是不能写*
        if(req.headers.origin){ // cors 可以专门解决跨域问题  , 跨域很少使用cookie 
            // console.log(req.headers.origin)
            res.setHeader('Access-Control-Allow-Origin',req.headers.origin); // 允许任何人来访问我
            res.setHeader('Access-Control-Allow-Headers','authorization,xxx,xxx,xxx,xxx')
            res.setHeader('Access-Control-Allow-Credentials',true);  
            res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS'); // 默认只支持 post 和get 其他方法不允许
            //  默认服务端设置的cookie 下次可以被自动携带上 
            res.setHeader('Access-Control-Max-Age','5'); // 告诉options请求 5s发一次  每次刷新会重新设置5s的值
        }
        if(req.method.toLowerCase() === 'options'){ // 处理预检请求
            return res.end(); // 服务器运行options 
        }
        if(this.request(req, res)){  // 这里面处理动态请求
            return 
        }
        let { pathname } = url.parse(req.url, true);
        let originalPath = path.join(this.directory, pathname);
        // 1.路径存在是文件  2.路径不存在则报错 3.路径是文件夹
        try {
            let statObj = await fs.stat(originalPath);
            if (statObj.isFile()) {
                this.sendFile(originalPath, req, res, statObj);
            } else {
                // 文件夹 
                let dirs = await fs.readdir(originalPath);
                // 需要模板引擎 渲染对应的内容
                dirs = dirs.map(dir => {
                    let statObj = statSync(dir)
                    return {
                        url: path.join(pathname, dir),
                        dir,
                        info: statObj.isFile() ? '文件' : '文件夹',
                        size: statObj.size == 0 ? '' : statObj.size
                    }
                })
                let html = ejs.render(this.tempalte, { dirs })
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(html);
            }
        } catch (err) {
            this.sendError(err, req, res);
        }
    }
    // 缓存针对的是某一个文件的缓存 
    cache(req, res, statObj) {  // 静态资源 sendFile
        // 强制缓存 根本不会访问服务器 ， 所以就算文件改了 也没办法
        // 服务器给你一个etag  下次你会将值带过来 ，放到header上名字叫if-none-match
        // 服务器给了一个modifiedSince 下次你会带过if-modified-since 

        // 常见情况 图片采用强制缓存
        // js 或者css 采用 对比缓存
        // 也可以采用强制 + 对比的方式

        // xxx.css -》 text/css
        // xxx.js -> application/javascript

        // 早期的浏览器使用expires  强制缓存 适合不经常变化的文件 
        res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString()); // 绝对时间
        // 新版本 全部采用cache-control 默认会以cache-control为基准
        res.setHeader('Cache-Control', 'max-age=10'); // 10s内不要来找我  相对时间
        // res.setHeader('Cache-Control','no-cache') 不缓存，但是缓存中有的话，每次询问服务器
        // res.setHeader('Cache-Control','no-stroe') 真正的不缓存，压根就没有缓寸


        // 自己引用的文件，可以设置强制缓存  304
        // 如果直接访问的资源Cache-Control: max-age=0 默认访问的资源不走强制缓存
        // 如果10s后访问我了 ，但是资源还是没变怎么办？  （协商缓存 对比缓存 服务器应该比一下文件有没有变化，如果没变化告诉浏览器你找缓存去别来找我了）


        // 这两个是有优先级的 etag的优先级高于 lastModified （这个优先级可以自己控制）
        let lastModified = statObj.ctime.toGMTString();
        // let ifModifiedSince = req.headers['if-modified-since'];

        let etag = lastModified + statObj.size;// 生成一个etag ， 1s内改了  10次 光靠lastModified是不够的 所以看下大小
        let ifNomeMatch = req.headers['if-none-match'];

        res.setHeader('ETag', etag); // 文件的hash值
        // res.setHeader('Last-Modified', lastModified);

        // 尽可能保证 能缓存，但是有一点问题 都希望返回最新的
        if (etag !== ifNomeMatch) { // 说明对比后是一样的
            return false;
        }
        // if (ifModifiedSince !== lastModified) {
        //     return false;
        // }
        return true;

        // let lastModified = statObj.ctime.toGMTString(); // 最后修改时间
        // res.setHeader('Last-Modified', lastModified);
        // let ifModifiedSince = req.headers['if-modified-since'];


        // let etag = crpto.createHash('md5').update(readFileSync(originalPath)).digest('base64');

        // res.setHeader('ETag', etag); // 文件的hash值
        // let ifNomeMatch = req.headers['if-none-match']; // 下次来的时候会带过来这个hash值

        // if (etag === ifNomeMatch) {
        //     return true;
        // } 
        // if (lastModified == ifModifiedSince) {
        //     return true; // 不使用缓存
        // }
        // 最后修改时间是以秒为单位的  1s 内改了十次  是无法比对出来的
        // 我修改了文件但是文件没有变化 也会出现比对失败
        // 比对文件内容 如果文件内容一致 肯定没有变化 Etag 指纹
        return false;
    }

    gzip(req, res) {
        let encoding = req.headers['accept-encoding']; // 获取客户端支持哪些压缩 
        if(encoding.includes('gzip')){
            res.setHeader('Content-Encoding','gzip'); // 浏览器会会根据这个字段进行解压
            return zlib.createGzip(); // 大文件不适合有gzip  视频  gzip核心就是替换
        }
    }
    sendFile(originalPath, req, res, statObj) {
        // http 的优化 减少请求  减少发送的数据  减少发送数据的体积
        if (this.cache(req, res, statObj)) {
            res.statusCode = 304; // 服务端告诉浏览器找缓存
            return res.end()
        }
        res.setHeader('Content-Type', mime.getType(originalPath) || 'text/plain' + ';charset=utf-8')
        // 对文件进行压缩
        let createGzip; // 重复性低 的东西会变大
        if (/\.(js|css)/.test(originalPath) && (createGzip = this.gzip(req,res))) {
            // 转化流 a ->  B(转化流) -> C
            return createReadStream(originalPath).pipe(createGzip).pipe(res);
        }
        return createReadStream(originalPath).pipe(res); // 管道的方式
    }
    sendError(err, req, res) {
        console.log(err);
        res.statusCode = 404;
        res.end('Not Found')
    }
    start() {
        const server = http.createServer(this.handleRequest);
        server.listen(this.port, () => {
            console.log(`${chalk.yellow('Available on:')}`)
            this.networkInterfaces.forEach(item => {
                console.log(`  ${item.address}:${chalk.green(this.port)}`)
            });
            console.log(`Hit CTRL-C to stop the server`)
        })
    }
}

function createServer(options = {}) {
    return new Server(options);
}


// 客户端请求服务端的资源 -》 服务端读取内容，返回给浏览器 -》 浏览器解析

module.exports = createServer