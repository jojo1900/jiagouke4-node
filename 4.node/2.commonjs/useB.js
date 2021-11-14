// eXports = module.exports  = {}
// thisValue = exports 

// const b = require('./b.js')



// 不能只修改exports 的指针，他不会影响 module.exports , 所以不能使用exports = xxxx的形式
// 用module.exports就可以了为啥还要exports,目的就是导出部分属性的时候 使用exports.xxx 是比较方便的 
// node中不允许 既使用exports.xxx 又使用module.exports = 'abc'
// es6 是可以的 export {a ,b} export default 'xxx'

// 不导出直接放到global上也是可行的, 为了偷懒 获取数据库链接的变量挂载到global上
// 会污染全局变量 不建议使用


// 尽量不要文件和文件夹同名 可能会出现想不到的问题 (老版本node查找的时候会看如果文件夹中有package.json 会优先查找的 8 以前)
let b = require('./aa')
console.log(b)

//  统一都是先找 package.json 中对应的入口文件，找不到在找 index.js

// 1.文件和文件夹不要同名（同一个目录下）
// 2,文件夹中的内容不要有index.js 而且入口指定的是其他文件


let r = require('c');// 如果不是相对路径或者绝对路径 那么他指的有两种可能一种就是内置模块，另一种就是第三方模块, 通过相对路径或者绝对路径引用的都叫文件模块
console.log(r)

console.log(module.paths) // 查找第三方模块会根据module.paths 的顺序进行查找，不停的找，找到后就返回找不到就报错了


// 导出采用module.exports 导入采用require  在使用的时候避免怪异的写法