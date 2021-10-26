/**
 * javascript
 * code 17
 * Pow(x, n)
 */

/**
 * Number.toFixed(n) 将数字转为字符串类型, 且保留n位小数点
 * 如果n=0, 则返回1
 * 如果n>0, 则整数幂
 * 
 * 提交代码
 * 超出时间限制: 2.00000, -2147483648
 * 
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = function(x, n) {
    const dot = 5;
    if(x === 0) return 0;
    if(n === 0) return 1;
    if(n > 0) {
        return positiveNum(x, n).toFixed(dot);
    }
    return negativeNum(x, n).toFixed(dot);
};

// n 是正数
const positiveNum = (x, n) => {
    let i = 0;
    let res = 1;
    while(i < n) {
        res *= x;
        i++;
    }
    return res;
};

// n 是负数
const negativeNum = (x, n) => {
    return positiveNum(1/x, -n);
}


/**
 * 改进
 * 
 * 评论区一解法
 * 折半计算
 * 
 * 这种思想很巧妙
 * 使用折半计算，每次把n缩小一半，这样n最终会缩小到0，任何数的0次方都为1，这时候我们再往回乘，
 * 如果此时n是偶数，直接把上次递归得到的值算个平方返回即可，
 * 如果是奇数，则还需要乘上个x的值。
 * 还有一点需要引起我们的注意的是n有可能为负数，对于n是负数的情况，我们可以先用其绝对值计算出一个结果再取其倒数即可。
 * 我们让i初始化为n，然后看i是否是2的倍数，是的话x乘以自己，否则res乘以x，
 * i每次循环缩小一半，直到为0停止循环。最后看n的正负，如果为负，返回其倒数。
 * 
 * x是成倍的增加, 增加次数等于减半次数
 * 如果此时n是奇数, 则让res乘上上一词递归的值, 得到新的res
 * 
 * 巧妙一: 折半思想
 * 巧妙二: 如果n是负数的处理, 先按正数计算, 再取倒数
 * 
 * 折半, 为什么要分偶数和奇数？
 * 如果是偶数, 2,1; 4,2,1; 6,3,1; 8,4,2,1; 10,5,2,1
 * 如果是奇数, 1; 3,1; 5,2,1; 7,3,1
 * 
 * 如果n=4,x=2
 * - 4, 4%2=0, res=1, x=4(两次方)
 * - 2, 2%2=0, res=1, x=16(四次方)
 * - 1, 1%2!=0, res=16(四次方), x=256(八次方)
 * 
 * 如果n=5,x=2
 * - 5, 5%2!=0, res=2(一次方), x=4(两次方)
 * - 2, 2%2=0, res=2(一次方), x=16(四次方)
 * - 1, 1%2!=0, res=32(五次方), x=265(八次方)
 * 
 * 看网上还有一种解法: 快速幂算法
 * 
 */
const myPow2 = function(x, n) {
    let res = 1.0;
    const np = n < 0 ? -n : n;
    for(let i = np; i !== 0; i = Math.floor(i / 2)) {
        if(i % 2 !== 0) { // 奇数
            // 由于i/2这i为奇数时会造成损失, 损失量刚好是上一次的x值
            res *= x;
        }
        // x成倍增加, 加倍的次数等于减半的次数
        x *= x;
    }
    return n < 0 ? 1/res : res;
};

// console.log(new Date().getTime())
// console.log(2.00000, 10, myPow2(2.00000, 10))
// console.log(2.10000, 3, myPow2(2.00000, 3))
// console.log(2.10000, 3, myPow2(2.00000, -2))
// console.log(2.10000, 3, myPow2(2.10000, 3))
// console.log(new Date().getTime())


/**
 * 测试
 * 如果n大于0, 则直接计算x的n次方
 * 如果n小于0, 则x取倒数, 然后进行-n次方计算 -> 先计算x的-n次方, 然后取倒数(这是一个很不错的转变)
 * 那如何计算的呢?
 * 如果直接使用n个x相乘, 则比较耗时, 不是最优的;
 * 有人提出使用折半计算, 既然折半, 如何计算?
 * @param {*} x 
 * @param {*} n 
 */
const pow = function(x, n) {
    if(x === 0) return 0;
    if(n === 0) return 1;

    let i = 0, res = 1;

    const sign = n < 0 ? -1 : 1;

    // // 连续n个x相乘(x是不变的)
    // while(i < sign * n) {
    //     res *= x;
    //     i++;
    // }

    // 折半计算
    // 如果n=1, 奇数
    // 如果n=2, 偶数, 2/2=1 -> 2, 1
    // 如果n=3, 奇数, 3/2=1 -> 3, 1
    // 如果n=4, 偶数, 4/2=2, 2/2=1 -> 4, 2, 1(4,3,2,1) n/2 -> 2, (x = x * x, 2) -> 1, (x = x *x, 4)
    // x = x * x -> 一次, 是2次方; 二次, 是四次方 -> 偶次方
    for(let k = sign * n; k > 0; k = Math.floor(k / 2)) {
        console.log(k, x);
        x *= x;
    }

    return res;
};

console.log(2, 3, pow(2, 3));