const crypto = require('crypto');


// md5 是一种摘要算法 同一个文件摘要出的结果相同 ,不同内容摘要的结果不同 
// 内容有一点变化，结果会发生剧烈变化 （雪崩效应）  md5 是不可逆的  , 不同内容摘要的结果长度相同




let r1 = crypto.createHash('MD5').update('12123131323 ').digest('hex');

let r2 = crypto.createHash('MD5').update('12123131323 ').digest('hex');

console.log(r1 === r2); // 在传输内容的时候 为了保证内容没有被篡改过 ，就可以使用摘要算法