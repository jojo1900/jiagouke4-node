const fs = require("fs").promises;
async function read() { // 生成器  固定写法 加个*
  // 很像同步的
    let out1 = await fs.readFile("a1.txt", "utf8"); // 串行 底层就是递归 ， try{}catch在同步代码中捕获异常
    let out2 = await fs.readFile(out1, "utf-8");
    return out2;
}


read().then(data=>{ // promoise 如果没有爆出异常就会执行下一次的成功
    console.log(data,'sucess')
}).catch(err=>{
    console.log(err,'catch')
})

// async+await  函数就是 generator + co的语法糖