const EventEmitter = require('events');
const fs = require('fs')
class ReadStream extends EventEmitter {
    constructor(path, options) {
        super()
        this.path = path;
        this.flags = options.flags || 'r';
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.start = options.start || 0;
        this.end = options.end;
        this.emitClose = options.emitClose || true;
        this.encoding = options.encoding;
        // 是否需要触发data事件
        this.flowing = false; // 当用户监听了data事件后 就将flowing 变为true
        this.offset = this.start; // 偏移量
        this.open()
        // 是events模块中的固定写法 ，  内部会在动触发 newListener 方法
        this.on('newListener', (type) => {
            if (type === 'data') { // 用户监听了data事件
                this.flowing = true;
                this.read();
            }
        })
    }
    destory(err) {
        if (err) {
            this.emit('error', err);
        }
        if (this.fd) {
            fs.close(this.fd, () => {
                this.emit('close');
            })
        }
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.destory(err);
            }
            this.fd = fd;
            this.emit('open', fd); // 触发open事件
        })
    }
    read() { // ?
        // 需要保证文件打开后 才能读取内容
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this.read())
        }

        // 4  2  
        // offset = 4
        const howMuchToRead = this.end ?
            Math.min(this.highWaterMark, (this.end - this.offset + 1))
            : this.highWaterMark
        // 用户会保留 每次读出的结果，如果用同一个内存地址 会到，缓存的都是最后一次的
        const buffer = Buffer.alloc(howMuchToRead);

        // 如果用户没有传递end， 那么最后的一次可能读取的数据小于水位线
        // bytesRead ! == howMuchToRead
        fs.read(this.fd, buffer, 0, howMuchToRead, this.offset, (err, bytesRead) => {
            if (err) return this.destory(err);
            if (bytesRead == 0) {
                this.emit('end'); // 如果读取不到内容 说明整个流程就完成了 触发end事件
                return this.destory(); // 最终销毁即可
            }
            this.offset += bytesRead;
            this.emit('data', buffer.slice(0, bytesRead));
            if (this.flowing) {
                this.read()
            }
        })
    }
    pause() {
        if (this.flowing) {
            this.flowing = false
        }
    }
    resume() {
        if (!this.flowing) {
            this.flowing = true;
            this.read();
        }
    }
    pipe(ws){
        this.on('data',(chunk)=>{ // rs.emit('data')
            let flag = ws.write(chunk);
            if(!flag){
                this.pause();
            }
        })
        this.on('end',function(){
            ws.end();
        })
        ws.on('drain',()=>{
            this.resume();
        })
    }
}

// ReadStream extends readable extends EventEmitter
module.exports = ReadStream