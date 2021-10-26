/**
 * javascript
 * code 20
 * 有效的括号
 * 
 * arrary.pop() 删除数组的最后一个元素, 且返回删除的元素
 * 
 */

/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效.
 * 
 * 解法一: 利用栈的特性(先进后出)
 * 
 * 辅助函数hasCouple, 接收两个字符串, 判断是否是一对
 * 辅助数组stack, 保存未消除的字符栈
 * 
 * 循环遍历给定的字符串s, 得到字符s[i], 判断该字符是否与stack的栈顶元素是一对,
 * 如果是一对, 则删除stack的栈顶元素, 出栈
 * 否则, 则入栈, 作为新的栈顶元素
 * 
 * 提交代码:
 * 执行用时72ms, 在所有 JavaScript 提交中击败了63.98%的用户
 * 内存消耗38.8MB, 在所有 JavaScript 提交中击败了50.51%的用户
 * 
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) {
    if(!s) return true;
    if(s.length === 1) return false;
    let stack = [s[0]], index = 0;
    for(let i = 1; i < s.length; i++) {
        if(hasCouple(stack[index], s[i])) {
            stack.pop();
            index--;
            continue;
        }
        stack.push(s[i]);
        index++;
    }
    return stack.length > 0 ? false : true;
};
// 优化
// 如果s的长度是奇数, 必不会是有效括号, 增加奇数长度的判断
// 可以将结果判断更改为index是否小于等于0, 因为index表示stack的长度-1
// const isValid = function(s) {
//     if(!s) return true;
//     if(s.length % 2 !== 0) return false;
//     let stack = [s[0]], index = 0;
//     for(let i = 1; i < s.length; i++) {
//         if(hasCouple(stack[index], s[i])) {
//             stack.pop();
//             index--;
//             continue;
//         }
//         stack.push(s[i]);
//         index++;
//     }
//     return index < 0;
// };

const hasCouple = (sa, sb) => (["()","{}","[]"].findIndex(s => s === (sa || "") + sb)) < 0 ? false : true;


/**
 * 解法二
 * 改善思路
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s, 判断字符串是否有效.
 * 
 * 主体思路: 
 * 如果是左括号, 则入栈;
 * 如果是右括号, 则判断是否与栈顶元素是一对, 如果不是, 则返回false, 否则继续遍历
 * 
 * 如果是该字符串长度是奇数, 则必不会
 * 
 */
const isValid2 = function(s) {
    if(!s || !s.length) return;
    if(s.length % 2 !== 0) return false;
    let stack = [s[0]];
    const coupleSim = {
        "(": ")",
        "{": "}",
        "[": "]"
    };
    for(let i = 1; i < s.length; i++) {
        // 如果是左括号
        if(s[i] in coupleSim) {
            stack.push(s[i]);
            continue;
        }
        // 如果是右括号
        // 如果不在, 则是右括号, 则去判断栈顶元素是否是左括号
        // 如果栈顶元素是左括号, 则对应的是右括号, 与s[i]是相等关系
        if(s[i] !== coupleSim[stack.pop()]) {
            return false;
        }
    }
    return !stack.length;
};


/**
 * 执行用时: 72ms, 在所有 JavaScript 提交中击败了63.98%的用户
 * 内存消耗: 37.4MB, 在所有 JavaScript 提交中击败了99.05%的用户
 * @param {String} s 
 * @returns 
 */
const isValid3 = function(s) {
    if(!s || !s.length) return;
    if(s.length % 2) return false;
    const stack = [s[0]];
    for(let i = 1; i < s.length; i++) {
        switch(s[i]) {
            case "(":
            case "[":
            case "{": 
                stack.push(s[i]);
                break;
            case "}":
                if(stack.pop() !== "{") return false;
                break;
            case "]":
                if(stack.pop() !== "[") return false;
                break;
            case ")":
                if(stack.pop() !== "(") return false;
                break;

        }
    }
    return !stack.length;
};

console.log("()", isValid3("()"));
console.log("()[]{}", isValid3("()[]{}"));
console.log("(]", isValid3("(]"));
console.log("{[]}", isValid3("{[]}"));
console.log("([)]", isValid3("([)]"));