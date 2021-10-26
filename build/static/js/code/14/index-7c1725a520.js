/**
 * javascript
 * code 14
 * 罗马数字转整数
 * 罗马数字转换比较适合学生认识数字的组成部分(个位, 十位, 百位, 千位), 而且只涉及加减法(前提, 认识字母)
 */

/**
 * 将给定的罗马数字转为十进制整数
 * 解法一
 * 循环遍历s, 从右往左
 * 例如: s = "MCMXCIV", 表示1994
 * 1. V -> 5
 * 2. I -> 1, 由于1<5, 于是做减法 sum=5-1=4
 * 3. C -> 100, 由于100>1, 于是做加法 sum=100+4=104
 * 4. X -> 10, 由于10<100, 于是做减法 sum=104-10=94
 * 5. M -> 1000, 由于1000>10, 于是做加法 sum=1000+94-1094
 * 6. C -> 100, 由于100<1000, 于是做减法 sum=1094-100=994
 * 7. M -> 1000, 由于1000>100, 于是做加法 sum=1000+994=1994
 * 
 * 另一种思路, 按位, 直到找到一个比第一个值大一位
 * 1. 个位 V->5, I->1 -> 4
 * 2. 十位 C->100,X->10 -> 90
 * 3. 百位 M->1000,C->100 -> 900
 * 4. 千位 M->1000 -> 1000
 * 求和得到1994=4+90+900+1000
 * 
 * @param {String} s 
 */
const romanToInt = function(s) {
    if(!s || !s.length) return 0;
    if(s.length > 15) return;

    const data = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000,
    };

    let pre = 0, sum = 0;
    
    for(let i = s.length - 1; i >= 0; i--) {
        const temp = data[s[i]];
        if(temp >= pre) {
            sum += temp;
        } else {
            sum -= temp;
        }
        pre = temp;
    }

    return sum;
};

console.log("III", romanToInt("III"));
console.log("IV", romanToInt("IV"));
console.log("IX", romanToInt("IX"));
console.log("LVIII", romanToInt("LVIII"));
console.log("MCMXCIV", romanToInt("MCMXCIV"));
console.log("IV", romanToInt("IV"));