/**
 * javascript
 * code 09
 * 三数之和
 * 寻找给定的整数数组中两数和等于另外一个数所组成的数组
 * 例如 [-1,0,1,2,-1,-4] -> [[-1,-1,2],[-1,0,1]]
 * a + b = c
 * -1, 0, -1+0=-1 -> -1 -> [-1, 0, -1]
 * 0, 1 -> 0+1=1 -> 1无
 * 2, -1 -> 
 */

/**
 * 三数之和
 * 提交一
 * 暴力解决, 在寻找三数之前先去掉数组中重复的元素
 * 
 * 理解错题意
 * 题意是 a + b + c = 0 -> a + b = -c
 * 
 * 而笔者理解的是 a + b = c
 * 
 * @param {Array} nums 
 */
const threeSum = function(nums) {
    if(nums.length < 3) return [];
    // 判断三个数中是否有和相同
    const hasQuitByThree = function(num1, num2, num3) {
        if(num1 + num2 === num3) return true;
        if(num1 + num3 === num2) return true;
        if(num2 + num3 === num1) return true;
        return false;
    };
    let i = 0, res = [], temp = [...nums];
    // 过滤掉重复的元素, 这样出来的数据都是唯一的
    // 先对给定的数组进行过滤, 去掉重复的元素
    temp = temp.reduce((prev, cur) => {
        if(prev.includes(cur)) return prev;
        return [...prev, cur]
    }, []);
    while(i < temp.length) {
        let j = i + 1;
        while(j < temp.length) {
            let k = j + 1;
            while(k < temp.length) {
                // console.log(i, j, k, temp.length, "和: ", temp[i], temp[j], temp[k], hasQuitByThree(temp[i], temp[j], temp[k]))
                if(hasQuitByThree(temp[i], temp[j], temp[k])) {
                    res.unshift([temp[i], temp[j], temp[k]]);
                }
                k++;
            }
            j++;
        }
        i++;
    }
    return res;
};

// console.log([-1,0,1,2,-1,-4], threeSum([-1,0,1,2,-1,-4]));

/**
 * 针对threeSum的改进
 * 寻找数组中的三数之和且不可重复
 * 理解错题意
 * @param {Array} nums 
 */
const threeSum2 = function(nums) {
    let res = [], temp = [...nums];
    
    // 判断三数是否可以构成和等式
    const hasQuitByThree = function(num1, num2, num3) {
        let has = false;
        if(num1 + num2 === num3 || num1 + num3 === num2 || num2 + num3 === num1) {
            has = true; 
        }
        return has;
    };

    for(let i = 0; i < temp.length; i++) {
        for(let j = i + 1; j < temp.length; j++) {
            for(let k = i + 2; k < temp.length; k++) {
                const t = [temp[i], temp[j], temp[k]];
                if(res.includes(t)) break;
                if(hasQuitByThree(...t)) {
                    res.unshift(t);
                }
            }
        }
    }

    return res;
};

// console.log([-1,0,1,2,-1,-4], threeSum2([-1,0,1,2,-1,-4]));

/**
 * 三数之和
 * a+b+c=0, 且不可重复
 * 解法一: 暴力解决
 * 算法复杂度分析:
 *  - 时间复杂度是O(n的四次方)
 *  - 空间复杂度O(n)
 * @param {Array} nums 
 * @returns 
 */
const threeSum3 = function(nums) {
    let res = [], temp = [...nums];
    
    // 判断三数是否可以构成和等式
    const hasQuitByThree = function(num1, num2, num3) {
        let has = false;
        if(num1 + num2 + num3 === 0) {
            has = true; 
        }
        return has;
    };

    // 判断是否重复
    for(let i = 0; i < temp.length; i++) {
        for(let j = i + 1; j < temp.length; j++) {
            for(let k = j + 1; k < temp.length; k++) {
                const t = [temp[i], temp[j], temp[k]];
                if(!hasQuitByThree(...t)) {
                    continue;
                }
                // 当前三个数是否和为0且不在res
                let has = false;
                // console.log(res.includes([temp[i], temp[j], temp[k]]))
                for(let u = 0; u < res.length; u++) {
                    let v = res[u].join("");
                    // A32 排列, 共有6种
                    let ju = [
                        [temp[i], temp[j], temp[k]].join(""),
                        [temp[i], temp[k], temp[j]].join(""),
                        [temp[j], temp[i], temp[k]].join(""),
                        [temp[j], temp[k], temp[i]].join(""),
                        [temp[k], temp[i], temp[j]].join(""),
                        [temp[k], temp[j], temp[i]].join(""),
                    ]
                    if(ju.includes(v)) {
                        has = true;
                        break;
                    }
                }
                if(!has) {
                    console.log(i, j, k, res, t)
                    res.unshift(t);
                }
            }
        }
    }

    return res;
};

// console.log([], threeSum3([]));
// console.log([0], threeSum3([0]));
// console.log([-1,0,1,2,-1,-4], threeSum3([-1,0,1,2,-1,-4]));
// console.log([1,2,-2,-1], threeSum3([1,2,-2,-1]))
// 提交不通过 
// [-13,11,11,0,-5,-14,12,-11,-11,-14,-3,0,-3,12,-1,-9,-5,-13,9,-7,-2,9,-1,4,-6,-13,-7,10,10,9,7,13,5,4,-2,7,5,-13,11,10,-12,-14,-5,-8,13,2,-2,-14,4,-8,-6,-13,9,8,6,10,2,6,5,-10,0,-11,-12,12,8,-7,-4,-9,-13,-7,8,12,-14,10,-10,14,-3,3,-15,-14,3,-14,10,-11,1,1,14,-11,14,4,-6,-1,0,-11,-12,-14,-11,0,14,-9,0,7,-12,1,-6]


/**
 * 寻找三数之和且不重复
 * [1,2,-2,-1] -> 长度为4
 * 0,1,2
 * 1,2,3
 * 
 * 两层for循环, 确定a和b, 再判断0-(a+b)第三个数是否出现过
 * 
 * 难点: 最终找到个和为0的三数还不可以重复
 * 如何去掉重复的呢?
 * 
 * @param {Array} nums 
 */
const threeSum4 = (nums) => {
    if(nums.length < 3) return [];
    nums.sort((a, b) => a - b);
    let res = [], has = false;
    const resSet = new Set();
    for(let i = 0; i < nums.length - 2; i ++) {
        if(nums[i] > 0) break;
        for(j = i + 1; j < nums.length - 1; j++) {
            let sum = nums[i] + nums[j];
            if(nums.includes(-sum)) {
                // res.unshift([nums[i], nums[j], -sum]);
                console.log(resSet, `${nums[i]},${nums[j]},${-sum}`)
                // 没有得保证nums[i], nums[j], nums[k]三个值得大小顺序
                resSet.add(`${nums[i]},${nums[j]},${-sum}`);
                has = true;
            } else {
                has = false;
            }
        }
    }
    
    return Array.from(resSet).map(i => i.split(","));
};

/**
 * 针对threeSum4的优化
 * 先对给定的整数数组进行升序排列,使数组里的整数都是有序的
 * 双指针法
 * 
 * 三根指针,
 *  - i控制a -> a = nums[i]
 *  - j控制b -> b = nums[j]
 *  - k控制c -> c = nums[k]
 * 
 * 循环遍历排好序的整数数组, 记录a为nums[i]
 * 
 * 两根指针移动, j初值为i+1, k初值为nums.length-1
 * b为nums[j],c为nums[k]
 * 
 * 如果这三数之和大于0, k指针向左移动以取较小值
 * 如果小于0, j指针向右移动以取大值
 * 如果相等, 则找到一个, 但是要做去重校验(利用ES6的Set性质)
 * 循环上述步骤, 直至j与k相遇
 * 
 * Array.from(object, mapFunction, thisValue)
 *  - 用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组
 *  - 如果对象是数组返回 true，否则返回 false
 *  - object 必需, 转换数组的对象
 *  - mapFunction 可选, 数组中每个元素调用的函数
 *  - thisValue 可选, 映射函数mapFunction中的this对象
 * 
 * Set:
 *  - ES6中的Set, 是一个对象
 *  - 添加值方法, set.add
 * 
 * 复杂度分析:
 *  - 时间复杂度是O(n的2次方)
 *  - 空间复杂度是O(1)
 * 
 * @param {Array} nums 
 * @returns Array
 * 
 * 
 */
const threeSum5 = (nums) => {
    if(nums.length < 3) return [];

    // 排序
    nums.sort((a, b) => a - b);
    
    // Set成员值必须是唯一的
    let resSet = new Set();

    for(let i = 0; i< nums.length - 2; i++) {
        let j = i + 1, k = nums.length - 1;

        while(j < k) {
            let sum = nums[i] + nums[j] + nums[k];

            if(sum < 0) {
                j++;
                continue;
            }

            if(sum > 0) {
                k--;
                continue;
            }

            resSet.add(`${nums[i]},${nums[j]},${nums[k]}`);
            j++;
            k--;
        }

    }

    return Array.from(resSet, v => v.split(","));
}

// console.log([1,2,-2,-1], threeSum4([1,2,-2,-1]))
console.log([-1,0,1,2,-1,-4], threeSum5([-1,0,1,2,-1,-4]));