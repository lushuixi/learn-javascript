/**
 * javascript
 * code 08
 * 回文数
 * 
 * 判断给定的整数是否是回文数
 */

/**
 * 判断给定的整数是否是回文数
 * 
 * 将整数转为字符串, 判断字符串是否是回文字符串
 * 
 * x = 123
 * 1与3不同, 返回
 * @param {Number} x 
 */
const isPalindrome = function(x) {
    if(x === 0) return true;
    let s = String(x);
    let i = 0, j = s.length - 1;
    while(i <= j) {
        if(s[i] !== s[j]) {
            return false;
        }
        i++;
        j--;
    }
    return true;
};

// console.log(123, isPalindrome(123))
// console.log(-121, isPalindrome(-121))

/**
 * isPalindrome函数是将整数转为字符串来判断的
 * 能不能根据整数来判断是否是回文呢?
 * x = 123
 * 将整数反转, 判断两者是否相同
 * 如果是负数, 必不是回文
 * 如果是正整数, 则将其反转, 得到一个数字, 判断两者是否相同
 * -------------------------------------------------------上述的想法是错误的
 * 
 * 123/10=12, 123%10=3
 * 12/10=1, 12%10=2
 * 1/10=0, 12%10=1
 * 
 * @param {Number} x 
 */
const isPalindrome2 = function(x) {
    if(x < 0) {
        return false;
    }
    if(x === 0) {
        return true;
    }
    let num = x, reverseNum = [], k = 0, base = 10;
    // 得到组成整数的数字数组
    while(num !== 0) {
        // 数组向头部添加元素, unshift(元素) / splice(0, 0, 元素)
        reverseNum.unshift(num % base);
        num = Math.floor(num / base);
        k++;
    }
    let i = 0, j = k - 1;
    while(i <= j) {
        if(reverseNum[i] !== reverseNum[j]) {
            return false;
        }
        i++;
        j--;
    }
    return true;
};

// console.log(123, isPalindrome2(123))
// console.log(-121, isPalindrome2(-121))
// console.log(121, isPalindrome(121))
// console.log(0, isPalindrome(0))

/**
 * 判断给定的整数是否是回文数
 * 计算出该整数的逆序数, 与原数值是否相同, 若相同则是回文, 否则不是回文
 * @param {Number} x 
 * @returns 
 */
const isPalindrome3 = function(x) {
    let num = x, reverseX = 0;
    while(num > 0) {
        reverseX = reverseX * 10 + num % 10, num = Math.floor(num / 10);
    }
    if(x === reverseX) return true;
    return false;
};

console.log(123, isPalindrome3(123))
console.log(-121, isPalindrome3(-121))
console.log(121, isPalindrome3(121))
console.log(0, isPalindrome3(0))