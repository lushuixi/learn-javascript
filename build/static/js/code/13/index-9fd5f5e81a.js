/**
 * javascript
 * code 13
 * 整数转罗马数字
 */

/**
 * 将整数转为罗马数字
 * @param {Number} num 
 * @returns String
 */
const numerToRoman = function(num, pow) {
    const relation = {
        "1": "I",
        "2": "II",
        "3": "III",
        "4": "IV",
        "5": "V",
        "6": "VI",
        "7": "VII",
        "8": "VIII",
        "9": "IX",
        "10": "X",
        "20": "XX",
        "30": "XXX",
        "40": "XL",
        "50": "L",
        "60": "LX",
        "70": "LXX",
        "80": "LXXX",
        "90": "XC",
        "100": "C",
        "200": "CC",
        "300": "CCC",
        "400": "CD",
        "500": "D",
        "600": "DC",
        "700": "DCC",
        "800": "DCCC",
        "900": "CM",
        "1000": "M",
        "2000": "MM",
        "3000": "MMM"
    };

    // return relation[num + ""] || ""; // 字符串
    return relation[num] || ""; // 数字
};

/**
 * 给你一个整数，将其转为罗马数字
 * 
 * 解法一
 * 
 * 例如: num = 1994
 * 1994%10 -> 4 -> IV
 * 199%10 -> 9 -> 90 -> XC -> XCIV
 * 19%10 -> 9 -> 900 -> CM -> CMXCIV
 * 1%10 -> 1 -> 1000 -> M -> MCMXCIV
 * 最终结果是MCMXCIV
 * 
 * @param {number} num
 * @return {string}
 */
const intToRoman = function(num) {

    if(num < 1 || num > 3999) return;

    let res = "", i = 0;

    while(num>0) {
        const remainder = (num % 10) * Math.pow(10, i);
        res = numerToRoman(remainder, i) + "" + res;

        num = Math.floor(num / 10);
        i++;
    }

    return res;
};

console.log(3, intToRoman(3))
console.log(4, intToRoman(4))
console.log(9, intToRoman(9))
console.log(1994, intToRoman(1994))