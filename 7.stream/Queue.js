const LinkedList = require('./LinkList');
class Queue{
    constructor(){
        this.ll = new LinkedList();
    }
    add(element){
        this.ll.add(element)
    }
    poll(){
        return this.ll.remove(0)?.element; // 链判断运算符
    }
}
module.exports = Queue


// 我们可以基于链表 或者数组 实现队列和栈