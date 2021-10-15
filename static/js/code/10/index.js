/**
 * javascript
 * code 10
 * 最接近的三数之和
 * 
 */

/**
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target
 * 找出 nums 中的三个整数, 使得它们的和与 target 最接近, 返回这三个数的和
 * 假定每组输入只存在唯一答案
 * 
 * 解法一: 暴力解决
 * 三层for循环
 * 
 * @param {Array} nums 整数数组
 * @param {Number} target 整数, 目标值
 */
const threeSumClosest = (nums, target) => {
    if(nums.length < 3) return;
    let res, dNum;
    for(let i = 0; i < nums.length - 2; i++) {
        for(let j = i + 1; j < nums.length - 1; j++) {
            for(let k = j + 1; k < nums.length; k++) {
                let sum = nums[i] + nums[j] + nums[k];
                let temp = target - sum;
                if(dNum === undefined || dNum > Math.abs(temp)) {
                    dNum = Math.abs(temp);
                    res = sum;
                }
            }
        }
    }
    return res;
};

// console.log("[-1,2,1,-4], 1: ", threeSumClosest([-1,2,1,-4], 1))

/**
 * 针对threeSumClosest优化
 * 解法二
 * 一层for循环+双指针
 * 
 * 最接近target, |target-sum|是最小
 * 从target-sum出发, 0, 1, -1, 2, -2,  3, -3
 * target-sum = 0, -> sum = target,
 * target-sum = 1, -1 -> sum = target + 1 | target - 1
 * target-sum = 2, -2
 * target-sum = 
 * @param {Array} nums 
 * @param {Number} target 
 */
const threeSumClosest2 = (nums, target) => {
    if(nums.length < 3) return;

    // nums按升序排列
    nums.sort((a, b) => a - b);

    let res = 0, dNum;

    // 双指针法
    for(let i = 0; i < nums.length - 2; i++) {
        let j = i + 1, k = nums.length - 1;

        while(j < k) {
            // 三数之和
            let sum = nums[i] + nums[j] + nums[k], temp = Math.abs(target - sum);

            console.log(i, j, k)

            // 本次操作
            if(dNum === undefined || dNum > temp) {
                res = sum;
                dNum = temp;
            }

            // 继续走
            // 三数之和大于target, k指针往左移, 寻找较小者(本次的已经记录了)
            if(sum > target) {
                k--;
            }else if(sum < target) {
                j++;
            } else {
                return res;
            }

        }
    }

    return res;
};

// console.log("[-1,2,1,-4], 1: ", threeSumClosest2([-1,2,1,-4, 8, 9], 1));
console.log("[-100,-98,-2,-1], -101: ", threeSumClosest2([-100,-98,-2,-1], -101))