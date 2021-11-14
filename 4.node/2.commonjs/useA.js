const path = require('path');
const fs = require('fs')
const vm = require('vm')
function Module(id) {
    this.id = id;
    this.exports = {}
}
Module._extensions = {
    '.js'(module){
        let source =  fs.readFileSync(module.id); // js中的源代码
        let wrapper = ['(function(exports,module,require,__dirname,__filename){','})']
        const script = wrapper[0] + source + wrapper[1]; // 字符串 
      
        let fn = vm.runInThisContext(script); // 字符串转成的函数

        let exports = module.exports  
        let filename = module.id
        let dirname = path.dirname(filename)
        // 执行此函数 用户会自动的给module.exports 赋值
        // 此函数执行的时候 this 发生了变化
        fn.call(exports,exports,module,req,dirname,filename); // 用户module.exports = 'hello'
    },
    '.json'(module){
       let content =  fs.readFileSync(module.id); // content 就是json中的内容
       module.exports = JSON.parse(content)
    }
}
Module._resolveFilename = function (id) {
    let filepath = path.resolve(__dirname,id);
    if(fs.existsSync(filepath)) return filepath

    let exts = Object.keys(Module._extensions);
    for(let i = 0; i < exts.length;i++){
        let p = filepath + exts[i];
        if(fs.existsSync(p)) return p
    }
    // 不存在尝试添加后缀 , .json ,json
    throw new Error('模块不存在')
}
Module.prototype.load = function(){ // 加载模块 
    let extension = path.extname(this.id);
    Module._extensions[extension](this)
}
Module._cache = {}; // 全局的缓存区 用来缓存模块的
function req(id) {
    // 将路径变成绝对路径 进行操作, 可能id 没有后缀 需要依次尝试追加后缀 .js  .json
    let filepath = Module._resolveFilename(id); // 根据相对路径获取一个绝对路径
    if(Module._cache[filepath]){ // 如果缓存中有 直接使用上一次缓存的结果
        return Module._cache[filepath].exports
    }
    let module = new Module(filepath);
    Module._cache[filepath] = module; // 将模块进行缓存
    module.load(); // 加载模块 
    return module.exports; // 最终返回的是module.exports 
}

let r = req('./a.js');
r = req('./a.js');
r = req('./a.js');
let b = req('./a.json')
console.log(r,b)


 // 基本类型和引用类型的区别 如果导出的是一个具体的值， 这个值就算变化了 也不会被重新获取
// 如果导出的是一个引用类型，如果改变了引用类型中的内容， 那么重新获取获取的就是这个更新后的内容


// 1.可以在chrome 浏览器中直接调试node代码  node --inspect-brk 文件名
// 2.vscode调试

// require是一个函数 接受一个./a
// Module._load 拿到文件路径进行加载 ./a
// 内部会通过 _resolveFilename 方法 将a 文件转化成绝对路径
// 通过绝对路径来进行实现

// 内部会有判断是否是绝对路径 来推测是不是一个内置模块
// 创建一个模块 （id, exports）
// 会将模块缓存起来

// 真正的加载模块

// 通过用户的路径 获取了一个绝对路径 根据这个路径创造了一个模块  {id:文件路径， exports 导出的结果}
//  module.load  内部会根据后缀名 解析文件 调用对应的处理方法


// 最终返回的是exports 对象


