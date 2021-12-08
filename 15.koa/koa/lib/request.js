const url = require('url')
const request = { // 对象的defineProperty
    get url(){

        // 取值的时候采用的是ctx.request.url
        // this.req.url
        return this.req.url
    },
    get path(){
        return url.parse(this.req.url).pathname
    },
    get query(){
        return url.parse(this.req.url,true).query
    }
}

module.exports = request;