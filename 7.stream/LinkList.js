// 队列 栈 链表 线性结构
class Node {
    constructor(element, next) {
        this.element = element; // 存放当前节点的内容
        this.next = next; // 下一个指针
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0; // 当前链表存放数据的个数
    }
    getNode(index) {
        let current = this.head; // 根据头部一直向下查找
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current; // 找到所引处返回
    }
    add(element, index = this.size) {
        if (index === 0) {
            let head = this.head; // 先把老的头部拿到 
            this.head = new Node(element, head); // 创造新节点替换掉老节点
        } else {
            // 通过索引添加 要循环找到对应的元素在添加 
            let prevNode = this.getNode(index - 1);// 获取前一个节点
            prevNode.next = new Node(element, prevNode.next);

        }
        this.size++;
    }
    remove(index) {
        let node;
        if (index == 0) {
            if (this.head) {
                node = this.head;
                this.head = this.head.next; // 将头部的内容指向下一个节点 ， 第一个就删掉了
                this.size--;
            }
        } else {
            let preveNode = this.getNode(index - 1);
            node = preveNode.next; // 要删除的节点
            preveNode.next = node.next;
            this.size--;

        }
        return node;
        // 删除返回删除后的节点
    }
    reverse() {
        function traversal(head) {
            // 一个节点没有， 或者就一个节点
            if (head == null || head.next == null) return head; // 新的头部
            let newHead = traversal(head.next); // 不停的找新头
            // 针对最后一次 newHead 就是4  head 就是3
            head.next.next = head;
            head.next = null;
            return newHead
        }
        return traversal(this.head)
    }
    reverse1() {
        let head = this.head;
        if (head == null || head.next == null) return head;    // 一个节点没有， 或者就一个节点
        let newHead = null;
        while (head) { // 把链表的内容 整个搬运一遍，什么时候没有了就没了
            let temp = head.next; // 先把除了对一个节点的节点保存一下
            head.next = newHead; // 将第一个头 指向新接的节点
            newHead = head; // 让新链表的头指向这个节点
            head = temp; // 将原来的链表更新
        }
        return newHead
    }

}
module.exports = LinkedList
// 处理头尾 追加 删除性能比较高 （双向链表）
// let ll = new LinkedList();
// ll.add('1');
// ll.add('2');
// ll.add('3');
// ll.add('4');
// console.dir(ll,{depth:5})

// console.log(ll.remove(0),ll.remove(0),ll.remove(0),ll.remove(0),ll)
// ll.add('3');
// ll.add('4'); // 传入链表索引为1的位置
// console.dir(ll,{depth:100});

// 如何实现单向链表的反转？