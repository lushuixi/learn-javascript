/**
 * javascript
 * code 18
 * 全排列
 */

/**
 * 全排列
 * 给定一个不含重复数字的数组 nums, 返回其所有可能的全排列
 * 
 * 解法一
 * 暴力解决吧, 事先未知循环次数, 怎么弄?
 * 
 * 
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function(nums) {
    const len = nums.length;
    if(len === 1) return nums;
    let res = [];
    for(let i = 0; i < nums.length; i++) {
        // 一层循环确定第一个位置
        let k = i + 1;
        while(k < nums.length) {

            k++;
        }
    }
    // 第二个位置
    return res;
};

/**
 * 看该题的解法
 * 
 * Array.from(obj) 将类数组转为数组
 * 
 */
const permute2 = function(nums) {
    const res = [], path = [];
    backtracking(nums, nums.length, []);
    return res;
    
    function backtracking(n, k, used) {
        console.log(path, k)
        if(path.length === k) {
            res.push(Array.from(path));
            return;
        }
        for (let i = 0; i < k; i++ ) {
            if(used[i]) continue;
            path.push(n[i]);
            used[i] = true; // 同支
            backtracking(n, k, used);
            path.pop();
            used[i] = false;
        }
    }
};

// console.log([1,2,3], permute2([1,2,3]));
console.log([0,1], permute2([0,1]));
// console.log([1], permute2([1]));