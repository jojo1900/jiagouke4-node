console.log(1);
async function async() {
    console.log(2);

    await console.log(3); // Promise.resolve(console.log(3)).then(()=>{console.log(4)})
    console.log(4)
}
setTimeout(() => {
    console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => {
    console.log(6);
    resolve(7) // 立刻执行 status = fulfilled
})
promise.then(res => {
    console.log(res)
})
async();
console.log(8)



//1 
// 6
// 2
// 3
// 8

// 微任务队列 [7微任务,4的微任务]
// 宏任务队列 [setTimeout 5]


// async 函数被调用的时候是立即执行的 await 下面的代码 相当于放到了Promise.then()回调中去了

// 16238745 