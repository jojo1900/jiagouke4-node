// server 就是我们的核心启动静态服务的入口
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const os = require('os'); // 内置模块
const { createReadStream, readFileSync,statSync } = require('fs')
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
    handleRequest = async (req, res) => { // 保证this 永远指向当前的自己的server实例
        // 处理文件夹路径 最终展现给我们
        console.log(req.url);


        // 协议：//（用户名：密码）域名：端口号/路径：查询参数：hash值
        // https://xxx:xxx@gitee.com:443/xxx?a=1#xxx
        let { pathname } = url.parse(req.url, true);
        let originalPath = path.join(this.directory, pathname);
        // 1.路径存在是文件  2.路径不存在则报错 3.路径是文件夹
        try {
            let statObj = await fs.stat(originalPath);
            if (statObj.isFile()) {
                this.sendFile(originalPath, req, res);
            } else {
                // 文件夹 
                let dirs = await fs.readdir(originalPath);
                // 需要模板引擎 渲染对应的内容
                dirs = dirs.map(dir => {
                    let statObj = statSync(dir)
                    return {
                        url: path.join(pathname,dir),
                        dir,
                        info:statObj.isFile() ? '文件':'文件夹',
                        size: statObj.size  == 0 ?  '':statObj.size
                    }
                })
                let html = ejs.render(this.tempalte, {dirs})
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(html);
            }
        } catch (err) {
            this.sendError(err, req, res);
        }
    }
    sendFile(originalPath, req, res) {
        // xxx.css -》 text/css
        // xxx.js -> application/javascript

        // 早期的浏览器使用expires  强制缓存 适合不经常变化的文件 
        res.setHeader('Expires',new Date(Date.now() + 10*1000).toGMTString()); // 绝对时间

        // 新版本 全部采用cache-control 默认会以cache-control为基准
        res.setHeader('Cache-Control','max-age=10'); // 10s内不要来找我  相对时间

        // 自己引用的文件，可以设置强制缓存  304
        // 如果直接访问的资源Cache-Control: max-age=0 默认访问的资源不走强制缓存

        // 如果10s后访问我了 ，但是资源还是没变怎么办？  （协商缓存 对比缓存 服务器应该比一下文件有没有变化，如果没变化告诉浏览器你找缓存去别来找我了）
        res.setHeader('Content-Type', mime.getType(originalPath) || 'text/plain' + ';charset=utf-8')
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