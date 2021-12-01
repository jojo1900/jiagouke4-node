

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url')
// 本地的服务  a.zf.cn

let server = http.createServer((req, res) => {
    let requestUrl = '.' + req.url; //    ./xxx

    fs.stat(requestUrl, function (err, statObj) {

        if (err) {
            res.statusCode = 404;
            res.end();

        } else if (statObj.isDirectory()) {
            res.end();
        } else {
            // 文件
            if (path.extname(requestUrl) === '.webp') {
                let referer = req.headers['referer'] || req.headers['referrer'];
                if (referer) {
                    let r1 = req.headers['host']; // 拿到自己的主机名
                    let r2 = url.parse(referer).host
                    console.log(r1,r2)
                    if (r1 !== r2) {
                        return fs.createReadStream('./2.webp').pipe(res);
                    }
                }
            }
            fs.createReadStream(requestUrl).pipe(res);
        }


    })







});
server.listen(3000);



// a.zf.cn   b.zf.cn

// a.zf.cn -> a.zf.cn/1.webp 图片 显示 1.webp
// b.zf.cn ->  a.zf.cn/1.webp图片 显示 2.webp  别人引用了我 

// 直接访问图片 显示的就是1.webp


