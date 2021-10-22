/**
 * javascript 
 * code 01
 * 两数之和
 * 
 * 2 -> 4 -> 3
 * 5 -> 6 -> 4
 * 结果
 * 7 -> 0 -> 8
 * 
 * Math.round 四舍五入
 * Math.ceil 向上取整
 * Math.floor 向下取整
 * parseInt 强行转化，得出最小整数，同Math.floor方法
 * 
 * sumTowNumbersByArray 数组的形式
 * 
 */
function sumTowNumbersByArray(l1, l2) {
    var maxLen = l1.length >= l2.length ? l1.length : l2.length;
    var temp = 0;
    var i = 0;
    for(i, maxLen; i < maxLen; i++) {
        var a = l1[i] || 0, 
            b = l2[i] || 0;
        console.log("a+b+temp", i, a, b, temp, a+b+temp);
        l1[i] = (a+b+temp)%10; // 取余数
        temp = Math.floor((a+b+temp)/10); // Math.floor 向下取整
    }
    if(temp > 0) {
        l1[i] = temp;
    }
    console.log(res);
    return l1;
}

// sumTowNumbersByArray([2, 4, 3], [5, 6, 4]);
sumTowNumbersByArray([0], [0]);
// sumTowNumbersByArray([9,9,9,9,9,9,9], [9,9,9,9]);


/**
 * 定义节点类型
 * @param {Number} val 
 * @param {ListNode} next 
 */
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

/**
 * 单链表形式求两数之和
 * @param {ListNode} l1 
 * @param {ListNode} l2 
 * @returns 
 */
var addTwoNumbers = function(l1, l2) {
    var carry = 0, node, prevNode;
    while(l1 || l2 || carry > 0) {
        var a = l1?.val || 0, b = l2?.val || 0;
        var sum = a + b + carry;
        carry = Math.floor(sum);

        sum = sum % 10;

        var current = new ListNode(sum);
        if(prevNode) {
            prevNode.next = current;
        } else {
            node = current;
        }
        prevNode = current;

        l1 = l1?.next;
        l2 = l2?.next;
    }
    return node;
};