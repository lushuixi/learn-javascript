/**
 * javascript
 * code 15
 * 求众数 II
 */

/**
 * 求众数
 * 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素
 * 
 * 解法一
 * 记录每个数字出现次数, 然后过滤掉没有超过 ⌊ n/3 ⌋ 次的元素
 * 算法分析:
 *  - 时间复杂度: O(n)
 * 
 * 解法二
 * 整数数组
 * 先排序, 一层循环就搞定了
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
const majorityElement = function(nums) {
    let count = {}, res = [];
    for(let i = 0; i < nums.length; i++) {
        const temp = String(nums[i]);
        if(!count[temp]) {
            count[temp] = 1;
            continue;
        }
        if(count[temp]) {
            count[temp] += 1;
            continue;
        }
    }

    const rule = Math.floor(nums.length / 3);
    
    Object.keys(count).forEach(item => {
        if(!count.hasOwnProperty(item)) return;
        if(count[item] > rule) {
            res.push(Number(item));
        }
    });

    return res;
};

// console.log([3,2,3], majorityElement([3,2,3])); // 3
// console.log([1], majorityElement([1])); // 1
// console.log([1,1,1,3,3,2,2,2], majorityElement([1,1,1,3,3,2,2,2]));
// console.log([1,2,3], majorityElement([1,2,3]));


/**
 * 解法二
 * 先排序, 后统计
 * 
 * 整数排序
 * 
 * @param {Array} nums Number[]
 * @returns Number[]
 */
const majorityElement2 = nums => {
};


// console.log([3,2,3], majorityElement2([3,2,3])); // 3
// console.log([1], majorityElement2([1])); // 1
// console.log([1,1,1,3,3,2,2,2], majorityElement2([1,1,1,3,3,2,2,2]));

/**
 * 解法三
 * 力扣该题的评论
 * 说最多有两个出现次数超过 ⌊ n/3 ⌋ 次的元素
 * 
 * 摩尔投票法
 */
const majorityElement3 = nums => {
    
};

console.log([3,2,3], majorityElement3([3,2,3])); // 3
console.log([1], majorityElement3([1])); // 1
console.log([1,1,1,3,3,2,2,2], majorityElement3([1,1,1,3,3,2,2,2]));
console.log([1,2,3], majorityElement3([1,2,3]));