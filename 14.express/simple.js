
const middle1 = (next) =>{
    console.log(1);
    next();
    console.log(2)
}

const middle2 = (next) =>{
    console.log(3);
    next();
    console.log(4)
}

const middle3 = (next) =>{
    console.log(5);
    next();
    console.log(6)
}

let stack = [middle1,middle2,middle3];
let idx = 0;
function next(){
    if(idx >= stack.length) return;
    let middleware = stack[idx++];
    middleware(next);
}
next()