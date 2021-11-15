function EventEmitter(){
    this._events = {}
}
EventEmitter.prototype.on = function(eventName,callback){
    if(!this._events) this._events = {}

    // 在绑定不是newListener的时候会优先触发listener事件，并将参数传递给你
    if(eventName !== 'newListener'){
        this.emit('newListener',eventName)
    }

    let events =( this._events[eventName] || []);
    events.push(callback)
    this._events[eventName] = events;
}
EventEmitter.prototype.emit = function(eventName,...args){
    if(!this._events) this._events = {}
    let callbacks = this._events[eventName];
    callbacks && callbacks.forEach(cb=>cb.call(this,...args))
} 
EventEmitter.prototype.once = function(eventName,callback){
    function one(...args){ // promise的then
        callback(...args);
        this.off(eventName,one)
    }
    one.l = callback; // 增加标识 
    this.on(eventName,one); // 绑定one函数， 最后one函数被触发后，再把one函数移除掉
}
EventEmitter.prototype.off = function(eventName,callback){
    if(!this._events) this._events = {}

    this._events[eventName] = this._events[eventName].filter((fn)=>{
        // one - shopping   one.l === shoping
        //   undefined !== callack = true
        return fn !== callback && fn.l !== callback
    })  

}  

module.exports = EventEmitter

