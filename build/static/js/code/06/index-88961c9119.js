/**
 * javascript
 * code 06
 * 整数反转
 * 
 */

/**
 * 123
 * 123/10 = 12, 123%10=3
 * 12/10=1, 12%10=2 -> 3*10+2=32
 * 1/10=0, 1%10=1 -> 32*10+1=321
 * 
 * 120 -> 021 -> 21
 * 120/10=12, 120%10=0 -> 0
 * 12/10=1, 12%10=2 -> 0 * 10 + 2 = 2
 * 1/10=0, 1%10=1 -> 2 * 10 + 1 = 21
 * 
 * @param {Number} x 
 * @returns 
 */
const reverse = function(x) {
    const hasOverBorder = function(num) {
        if(typeof num !== "number" || num > (Math.pow(2, 31) - 1) || num < (Math.pow(-2, 31))) {
            return true;
        }
        return false;
    }

    if(hasOverBorder(x)) {
        return 0;
    }

    let num = Math.abs(x), res = 0;

    while(num !== 0) {
        let mod = num % 10;
        num = Math.floor(num / 10);
        if(res === 0 && mod === 0) {
            continue;
        }
        res = res * 10 + mod;
        if(hasOverBorder(res)) {
            return 0;
        }
    }

    res = x < 0 ? Number("-" + res) : res;

    return hasOverBorder(res) ? 0 : res;
};

console.log(123, reverse(123));
console.log(-123, reverse(-123));
console.log(0, reverse(0))
console.log(120, reverse(120))
console.log(100, reverse(100))
console.log(1534236469, reverse(1534236469))