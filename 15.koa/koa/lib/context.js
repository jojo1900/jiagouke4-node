const context = {
    // get url(){
    //     return this.request.url;
    // },
    // get path(){
    //     return this.request.path;
    // }
}

function defineGetter(target,key){
    context.__defineGetter__(key,function(){
        return this[target][key]
    })
}

function defineSetter(target,key){
    context.__defineSetter__(key,function(value){
        this[target][key] = value;
    })
}

defineGetter('request','url');
defineGetter('request','path');
defineGetter('response','body');
defineSetter('response','body');

module.exports = context;