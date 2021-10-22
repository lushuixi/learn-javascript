/**
 * javascript
 * code 07
 * 字符串转换为整数
 * 
 */

/**
 * 字符串转换为整数
 * @param {String} s 
 */
const myAtoi = function(s) {
    // 去除头尾空格
    s = s ? s.replace(/(^\s*)|(\s*$)/g, "") : s;
    if(!s || typeof s !== "string") return 0;
    let res = "", sign;
    for(let i = 0; i < s.length; i++) {
        let temp = s[i];
        // 如果是空格或者是前面的0字符
        if(!temp || (temp === "0" && !res)) continue;
        // 如果是前面的符号字符
        if(!res && (temp === "-" || temp === "+")) {
            sign = temp;
        }
        // 如果是数字字符
        if(temp === "0" || Number(temp)) {
            res += temp;
            continue;
        }
        if(res && !Number(temp)) {
            break;
        }
    }
    // 第一个找符号字符
    // 第二个找数字字符(如果第一个字符是非数字字符, 则退出)

    return res ? sign ? Number(sign + res) : Number(res) : 0;
};

// console.log(myAtoi("      --12 hello world"));

/**
 * myAtoi函数不完整, 且提交到力扣上没有通过
 * 做如下调整myAtoi2, 最终提交通过了
 * @param {*} s 
 * @returns 
 */
const myAtoi2 = function(s) {
    s = s ? s.replace(/(^\s*)|(\s*$)/g, "") : s;
    if(!s || typeof s !== "string") return 0;

    const numLimits = function(num) {
        num = Number(num);
        let min = Math.pow(-2, 31), 
            max = Math.pow(2, 31) - 1;
        if(num > max) {
            return max;
        }
        if(num < min) {
            return min;
        }
        return num;
    }

    let res = "", sign;
    for(let i = 0; i < s.length; i++) {
        let temp = s[i];
        // 前面空格字符
        if(!temp || temp === " ") {
            if(!sign && !res) continue;
            break;
        }
        // 如果是符号字符
        if(!res && !sign && (temp === "-" || temp === "+")) {
            sign = temp;
            continue;
        }
        let tempNum = Number(temp);
        // 数字字符
        if(temp === "0" || tempNum) {
            res += temp;
        }
        // 非数字字符
        if(isNaN(tempNum)) {
            break;
        }
    }

    return res ? sign ? numLimits(sign + res) : numLimits(res) : 0;
};

// console.log("123", myAtoi2("-123")) // -123
// console.log("4193 with words", myAtoi2("4193 with words")) // 4193
// console.log("+0 123", myAtoi2("+0 123")) // 0
// console.log("  +  413", myAtoi2("  +  413")) // 0

/**
 * 字符串转整数
 * 优化myAtoi2
 * parseInt
 * Number
 * 
 * Number
 * 如果是布尔值: true -> 1, false -> 0
 * 如果是数字值: 只是简单传入和返回
 * 如果是undefined: undefined -> NaN
 * 如果是null: null -> 0
 * 如果是对象: {} -> NaN, {a: 1} -> NaN
 * 如果是字符串:  
 *  - 如果字符串中只包含数字, 将其转为十进制, 忽略前面的0
 *  - 如果只包含有效浮点数格式, "1.1", 将其转为对应的浮点数, 忽略前面的0
 *  - 如果字符串中包含有效的十六进制格式，如“0xf”，将其转换为相同大小的十进制数值
 *  - 如果字符串为空或者空格字符，如"", " ", 将其转换为0
 *  - 如果字符串中包含除上述格式之外的字符，则将其转换为NaN
 * 如果是对象: 则调用对象的valueOf方法, 然后依照前面的规则转换返回的值, 如果转换的结果是NaN，则调用对象的toString()方法，然后再依照前面的规则转换返回的字符串值
 * 
 * parseInt
 * 处理整数的时候parseInt()更常用。
 * parseInt()函数在转换字符串时，会忽略字符串前面的空格，知道找到第一个非空格字符
 * 如果第一个字符不是数字或者负号，转为NaN
 * 如果是空字符串, 如 "", " ", -> NaN
 */
const myAtoi3 = function(s) {
    s = s ? s.replace(/(^\s*)|(\s*$)/g, "") : s;

    if(!s || typeof s !== "string") {
        return 0;
    }

    const numLimits = function(num) {
        num = typeof num !== "number" ? Number(num) : num;
        let min = Math.pow(-2, 31),
            max = Math.pow(2, 31) - 1;
        return num < min ? min : num > max ? max : num;
    };

    let res = "", sign;

    for(let i = 0; i < s.length; i++) {
        let temp = s[i];
        if((temp === "+" || temp === "-") && !res && !sign) {
            sign = temp;
            continue;
        }
        if(isNaN(parseInt(temp))) { // 非数字字符
            break;
        } else { // 数字字符
            res += temp;
        }
    }

    return res ? numLimits(sign ? sign + res : res) : 0;
};

console.log(" -42", myAtoi3(" -42")) // -42
console.log("words and 987", myAtoi3("words and 987")) // 0
console.log("+-12", myAtoi3("+-12")) // 0
console.log("-+12", myAtoi3("-+12")) // 0
console.log("+0 123", myAtoi3("+0 123")) // 0
console.log("  +  413", myAtoi3("  +  413")) // 0
