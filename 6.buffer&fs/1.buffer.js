// 默认计算机存储的数据 展示的数据 都是二进制的 ，node采用Buffer来描述二进制数据
// Node中的buffer采用16进制来进行表示 （描述的就是内存）

// i/o  读取文件中的内容放到内存中 -> 写入操作  
//      把内存中的数据读取出来 -> 读取操作


// 内存大小一旦声明后 不能随意更改大小  （声明buffer的时候要指定buffer的大小）

// 声明方式有三种 1） 根据长度来声明buffer  2) 用一个数组来声明buffer  3) 通过字符串来声明buffer

// npm install types\node 提供node的提示
const buf1 = Buffer.alloc(3, '2');
console.log(buf1); // 16进制表示的一个字节最大是多少？   255 -》 16进制  ff

// buffer中存放的都是内存空间， arrayBuffer只能由数字组成
const buf2 = Buffer.from([0x16, '200']); // 通过数组来创建buffer可以指定存放的内容 ， 基本用不到
console.log(buf2);

// 16进制和2进制10进制只是表现形式不同
const buf3 = Buffer.from('2'); // node默认采用的编码是utf8， 默认不支持gbk
console.log(buf3); // 最小单位是字节 字符串转换成buffer长度可能会变化


// 计算机的编码 ASCII (一个字符由一个字节来表示 127) 一个字节是255 所以用一个字节就可以表示一个字符
// gb18030 gbk （国标字体） 一个汉字由两个字节组成  255 * 255  gbk 就是最早我们的标识方法 
// unicode组织 -》 utf8


// buffer 常用的操作就是拼接buffer  (分片上传)


// 数据是按照顺序 可能第一个并没能组成汉字
let buf4 = Buffer.from('珠峰');
let buf5 = buf4.slice(0, 2); // 截取方法
let buf6 = buf4.slice(2, 6);


// copy方法用不到
/**
 * 
 * @param {*} targetBuffer  目标
 * @param {*} targetStart   目标开始
 * @param {*} sourceStart   源开始
 * @param {*} sourceEnd     源结束
 */
Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
    for (let i = 0; i < sourceEnd - sourceStart; i++) {
        targetBuffer[targetStart + i] = this[sourceStart + i]
    }
}
// let bigBuffer = Buffer.alloc(6);
// buf5.copy(bigBuffer, 0, 0, 2); // 第一次把两个字节拷贝过去
// buf6.copy(bigBuffer, 2, 0, 4) // 第二次是把4个字节拷贝过去
// console.log(bigBuffer.toString('utf8'));  // 拼接后一起消费

Buffer.concat = function (list, len = list.reduce((a, b) => a + b.length, 0)) {
    let bigBuffer = Buffer.alloc(len);
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
        list[i].copy(bigBuffer, offset);
        offset += list[i].length
    }
    return bigBuffer

}
let bigBuffer2 = Buffer.concat([buf5, buf6]);
console.log(bigBuffer2)


let buffer7 = Buffer.from([1, 2, 3, 4]);
let newBuffer = buffer7.slice(0, 1); // 截取的是内存空间
newBuffer[0] = 100; // 改变后 会影响之前内容， 在开发的时候 重复的更新buffer内容，要考虑之前的内容是否会收到影响
console.log(buffer7);

// -------- 因为buffer里面装的都是内存---------
let buf = Buffer.alloc(1);
let arr = [];
for (let i = 0; i < 3; i++) {
    buf[0] = i;
    arr.push(buf)
}
console.log(arr);


// 如何实现一个深拷贝
let arr1 = [[1], 2, 3];
let newArr = arr1.slice(0, 1); // buffer就类似一个二维数组
newArr[0][0] = 100;
console.log(arr1)


// --------------------------------
Buffer.prototype.split = function (sep) { // sep 做分隔符
    // buffer 和字符串的长度不一样
    sep = Buffer.isBuffer(sep) ? sep : Buffer.from(sep);
    let offset = 0; // 不停的修改
    let position = 0; // 找到的位置
    const arr = [];
    while (-1 !== (position = this.indexOf(sep, offset))) {
        arr.push(this.slice(offset,position));
        offset = position + sep.length
    }
    arr.push(this.slice(offset));
    return arr;
}

let buffer10 = Buffer.from('**|**|**');  // 分割buffer  -> 分割成buffer[]
// console.log(buffer10.indexOf('我',7)); // 返回的是字节索引
console.log(buffer10.split('|')) // 实现一个buffer的split方法


// buffer.length !== 字符串长度 
// buffer.slice  可以截取buffer, buffer在截取的时候 截取的是内存
// concat 这个用的是最大
// Buffer.isBuffer() 判断是不是buffer
// buffer.indexOf('x',从哪里开始找)  类似于字符串的indexOf

// buffer的使用  没有数组中filter forEach   buffer 用法很像数组 也很像 字符串 (字符串具备不可变性)

