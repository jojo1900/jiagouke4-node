


class Node {
    constructor(element, parent) {
        this.element = element;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}
class BST {
    constructor() {
        this.size = 0;
        this.root = null;
    }
    // insertNode(root, element) { // 不停的改变root 作为根节点
    //     let current = root;
    //     if (element < current.element) {
    //         if (current.left) {
    //             this.insertNode(current.left, element); // current.left
    //         } else {
    //             current.left = new Node(element, current)
    //         }
    //     } else {
    //         if (current.right) {
    //             this.insertNode(current.right, element); // current.right
    //         } else {
    //             current.right = new Node(element, current)
    //         }
    //     }
    // }
    compare(e1,e2){
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
            while(current !== null){
                // v 决定是放左边还是放右边
                v =  this.compare(element,current.element); // 用当前的插入元素 和 根元素比较
                parent = current; // parent决定了把数据放在谁的下面
                if(v < 0){
                    current = current.left; // 如果比当前节点小的 放在左边
                }else if(v > 0){
                    current = current.right
                }else{
                    current.element = element; // 直接用新的覆盖掉老的
                }
            }
            // current = null
            let node  = new Node(element,parent)
            if(v < 0){
                parent.left = node
            }else {
                parent.right = node
            }
        }
        this.size++;
    }
}

let bst = new BST();

[10, 8, 6, 12, 32, 2, 100,7,100,100].forEach(item => {
    bst.add(item);
})


console.dir(bst,{depth:1000})
