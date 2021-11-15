
// node的模块分为三种 1）文件模块（a.js ，bjs）  2） 内置模块 （fs,path,vm,events）   3） 第三方模块 （安装的）

// node都是基于回调的， 解耦可以采用发布订阅模式。 node很多代码都是基于发布订阅的  
// 流 、http 。。。
const EventEmitter = require('events');
// const {inherits} = require('util')

// on 订阅  emit 发布  once 订阅一次  off 移除监听  removeAllListeners 删除所有监听
class Girl extends EventEmitter {

}
// function create(proto){
//     function Fn(){}
//     Fn.prototype = proto;
//     return new Fn()
// }

// 这都是原型继承
// Girl.prototype.__proto__ = EventEmitter.prototype;
// Girl.prototype = create(EventEmitter.prototype)
// Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype)
// inherits(Girl,EventEmitter); // 原型继承继承了原型上的方法

let girl = new Girl();
let pending = false
// girl.on('newListener', function (eventName) { // 当触发这个回调的时候 ，绑定的事件还未绑定成功 
//     if (!pending) { // vue的nextTick  flushSqudualerQueue 异步更新原理
//         Promise.resolve().then(() => {
//             girl.emit(eventName); // []  ['哭']  [库，吃]  ['哭'，’吃‘，’购物‘]
//             pending = false;
//         })
//         pending = true;
//      }
// });


console.log('ok')
girl.on('我失恋了', function () { // {'我失恋了':[fn1,fn2,fn3],结婚了:[fn]}
    console.log('哭')
})
girl.on('我失恋了', function () {
    console.log('吃')
})
function shopping () {
    console.log('购物')
}
// girl.once('我失恋了',shopping )
// girl.off('我失恋了',shopping )
// [fn1,fn2,fn3]
// 只要你绑定了这个事件 我就让你自动触发

girl.emit('我失恋了')
girl.emit('我失恋了')


// 主要的发布订阅可就这几个方法
// once off emit on('newListener')

