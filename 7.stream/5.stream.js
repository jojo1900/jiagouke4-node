const { Readable, Writable, Duplex, Transform } = require('stream');

class MyReadStream extends Readable {
    _read() {
        this.push('123');
        this.push(null); // push null 后会调用end方法
    }
}
let mrs = new MyReadStream();
mrs.on('data', function (chunk) { // 内部默认调用的是Readable中的.read ， 会去调用自己写的 _read
    console.log(chunk)
})

mrs.on('end', function () {
    console.log('读取完毕了')
})


// 可读流内部实现原理 就是 内部创建后 当用监听了data事件 就会触发Readable 对应的read方法
// 默认会调用子类的_read 方法 （具体实现你可以自己实现 只是fs中用了fs.read方法）
// 将自己造的数据放到Readable.push方法中, 内部会自动触发data事件 将结果抛出来

class MyWriteStream extends Writable {
    _write(chunk, encoding, withClearBufferCallback) {
        console.log(chunk,'---'); // 第一次真的调用的是 _write 后续都放到缓存中了
        withClearBufferCallback();
    }
}
let mws = new MyWriteStream();
mws.write('ok')
mws.write('ok')
mws.write('ok')
mws.write('ok')
mws.end('123')

// 标准输入process.stdin.on  (进程间的交互)
// process.stdin.on('data',function(chunk){ // 监听用户的标准输入 
//     process.stdout.write(chunk); // 标准输出 内部和console.log() 调用的是同一个方法
// })

// 双工流 能读能写就是双工
class MyDuplex extends Duplex{ // MyDuplex 底层即实现了 Readable 也实现了Writable
    _read(){ // socket tcp 就是一个双工的

    }
    _write(){

    }
}

// 转化流
class MyTranform extends Transform{
    // 可以充当转化功能
    _transform(chunk, encoding, withClearBufferCallback){
        let data = chunk.toString().toUpperCase(); // 压缩。。。
        this.push(data)
        withClearBufferCallback();
    }
}

process.stdin.pipe(new MyTranform).pipe(process.stdout)


// class Eat {
//     eat(){
//         this._eat();
//     }
// }
// class Cat extends Eat{
//     _eat(){
//         console.log('鱼')
//     }
// }
// class Dog extends Eat{
//     _eat(){
//         console.log('肉')
//     }
// }
// let cat = new Cat();
// cat.eat();
// let dog = new Dog();
// dog.eat()