// module.exports = 'b';

// 如果只是改变了 exports的值是不会影响到module.exports 的
// exports = {a:1}

// module.exports = {b:200}

exports.a = 100;
exports.b = 200;
module.exports.c = 300;

this.d = 4000;


module.exports = {name:'zf'}

global.a = 100;

global.a = 100