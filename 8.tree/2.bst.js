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
    // 先序遍历
    prevOrderTraversal(visitor) { // 自己实现以下 非递归的 先序中序 后续
        let flag = false
        const traversal = (node) => {
            if (node == null || flag) return;
            flag = visitor.visit(node.element);  // 当前 左边 右边
            traversal(node.left);
            traversal(node.right)
        }
        traversal(this.root);
    }
    inorderTraversal(visitor) {
        let flag = false
        const traversal = (node) => {
            if (node == null || flag) return;
            traversal(node.left); // 左边已经有节点是6 了 就不要在继续访问左边了   8   6
            if (flag) return
            flag = visitor.visit(node.element); // 左边 当前  右边
            traversal(node.right)
        }
        traversal(this.root);
    }
    postorderTranversal(visitor) {
        let flag = false
        const traversal = (node) => {
            if (node == null || flag) return;
            traversal(node.left); // 右边已经有节点是6 了 就不要在继续访问左边了
            traversal(node.right) // 左边 右边中间
            if (flag) return
            flag = visitor.visit(node.element);
        }
        traversal(this.root);
    }
    levelOrderTraversal(visitor) {
        if (this.root == null) return;
        let stack = [this.root];
        let index = 0;
        let currentNode;
        while (currentNode = stack[index++]) {
            if (visitor.visit(currentNode.element)) return;
            if (currentNode.left) {
                stack.push(currentNode.left)
            }
            if (currentNode.right) {
                stack.push(currentNode.right)
            }
        }
    }
    invert() {
        const traversal = (node) => {
            if (node == null ) return;
            const temp = node.left; // 左右交换
            node.left = node.right;
            node.right = temp;
            traversal(node.left); // 左右交换了 ， 接着交换
            traversal(node.right)
        }
        traversal(this.root);
        // if (this.root == null) return;
        // let stack = [this.root];
        // let index = 0;
        // let currentNode;
        // while (currentNode = stack[index++]) {
        //     const temp = currentNode.left;
        //     currentNode.left = currentNode.right;
        //     currentNode.right = temp;
        //     if (currentNode.left) { // 放入的过程是为了保证能遍历完成
        //         stack.push(currentNode.left)
        //     }
        //     if (currentNode.right) {
        //         stack.push(currentNode.right)
        //     }
        // }
    }
}
let bst = new BST((e1, e2) => {
    return e1.age - e2.age
});
// 二叉搜索树的特点是存储的数据 必须有课比较性
// 数据存储的类型 必须是数字吗？  sort Api  支持数字的排序  传入排序器
[{ age: 10 }, { age: 8 }, { age: 6 }, { age: 19 }, { age: 15 }, { age: 22 }, { age: 20 }].forEach(item => {
    bst.add(item);
})
bst.levelOrderTraversal({
    visit(element) { // 后面我们使用babel的时候 遍历语法树的时候 写法就是这样的
        console.log(element)
        return element.age == 6; // 返回true 则停止遍历
    }
});
// diff算法 目录操作  路由配置  权限配置 ---- 树  常用的就是遍历树 和 格式化数据
// 如何反转二叉树 ?  homebrew 

bst.invert();
console.dir(bst,{depth:20})

// 比如说后续我们会经常操作树的节点  
// 树的遍历方式