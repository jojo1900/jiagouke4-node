class Node {  
    constructor(element, parent) {
        this.element = element;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}
class BST {
    constructor(compare) {
        this.size = 0;
        this.root = null;

        let defaultCompare = this.compare;
        this.compare = compare || defaultCompare;
    }
    compare(e1, e2) {
        return e1 - e2
    }
    add(element) {
        if (this.root === null) {
            this.root = new Node(element, null);
        } else {
            // this.insertNode(this.root, element)
            let current = this.root;
            let parent;
            let v;
            while (current !== null) {
                // v 决定是放左边还是放右边
                v = this.compare(element, current.element); // 用当前的插入元素 和 根元素比较
                parent = current; // parent决定了把数据放在谁的下面
                if (v < 0) {
                    current = current.left; // 如果比当前节点小的 放在左边
                } else if (v > 0) {
                    current = current.right
                } else {
                    current.element = element; // 直接用新的覆盖掉老的
                }
            }
            // current = null
            let node = new Node(element, parent)
            if (v < 0) {
                parent.left = node
            } else {
                parent.right = node
            }
        }
        this.size++;
    }
    // 这里想用非递归的方式 遍历树 可以采用栈的形式来实现 ， 前序遍历 将左右都存放起来 ，弹出左边，最后弹出右边
    prevOrderTraversal(visitor) {
        if (this.root == null) return;
        let stack = [this.root]; // 先进入的后出
        // 按照存放的顺序 去入栈，之后倒叙出栈  
        // 队列 先进的先出  层序遍历
        // 栈 是先进的后出 后进的先出
        while (stack.length > 0) { // 栈中有内容 我们就不停的循环 
            let node = stack.pop();
            if (visitor.visit(node.element)) return;
            if (node.right !== null) {
                stack.push(node.right)
            }
            if (node.left !== null) {
                stack.push(node.left)
            }
        }
    }
    // 中序遍历 就是将左边不停的入栈 ， 弹出后访问在看有没有右边
    inorderTraversal(visitor) {
        if (this.root == null) return;
        let stack = [];
        let node = this.root;// 第一个节点 
        while (true) {
            if (node !== null) {
                stack.push(node);
                node = node.left; // 不停的找左边 
            } else if (stack.length === 0) {
                return;
            } else {
                node = stack.pop(); // 弹出来一个就访问一个
                if (visitor.visit(node.element)) return; // 交给用户访问节点
                node = node.right
            }
        }
    }
    // 后续遍历 就是左右都放入 ，先弹出左边，在弹出右边 ，最后访问自己
    postorderTranversal(visitor) {
        if (this.root == null) return;
        let stack = [this.root];
        let node;
        while (stack.length > 0) {
            let current = stack[stack.length - 1]; // 取出最后一个 
            if ((current.left == null && current.right == null) || (node && node.parent == current)) { // 1永远有左右
                node = stack.pop(); // 左边出来
                if (visitor.visit(node.element)) return
            } else {
                if (current.right !== null) { // 有右边 我就先扔到栈中
                    stack.push(current.right); // 先将右边放入  先放右在放左  出来的就是左 
                }
                if (current.left !== null) {
                    stack.push(current.left); // 先将右边放入  先放右在放左  出来的就是左 
                }
            }
        }
    }
}
let bst = new BST((e1, e2) => {
    return e1.age - e2.age
});

[{ age: 10 }, { age: 8 }, { age: 6 }, { age: 19 },{age:22},{age:20}].forEach(item => {
    bst.add(item);
})
bst.postorderTranversal({
    visit(element) {
        console.log(element)
    }
});

// 数组的 pop push  栈
// 数组 push 和 shift 队列

// http-server 实现一个  缓存 + 压缩 + 多语言 cookie session jwt 跨域...

// 周三 周五  tcp网络  http1/2/3的区别/https  express框架 + 中间件的实现原理
// 下周mongo + redis   koa中间件 原理 
// grahql + 进程的使用