/**
 * javascript
 * code 11
 * 
 */

/**
 * 四数之和
 * 两层for循环+双指针
 * 耗时200ms
 * @param {Array} nums 
 * @param {Number} target 
 */
const fourSum = (nums, target) => {
    const base = 4;

    if(nums.length < base) return [];

    // 对原数组排序
    nums.sort((a, b) => a - b);

    const resSet = new Set();
    
    for(let i = 0; i < nums.length - base + 1; i++) {

        for(let j = i + 1; j < nums.length - base + 2; j++) {

            let k = j + 1, l = nums.length - 1;
            
            while(k < l) {
                let sum = nums[i] + nums[j] + nums[k] + nums[l];

                console.log(i, j, k, l, sum, target);

                if(sum < target) {
                    k++;
                } else if(sum > target) {
                    l--;
                } else {
                    resSet.add(`${nums[i]},${nums[j]},${nums[k]},${nums[l]}`);
                    k++;
                    l--;
                }
            }
        }

    }

    return Array.from(resSet, (cur) => cur.split(","))
};

// console.log("[1,0,-1,0,-2,2], 0: ", fourSum([1,0,-1,0,-2,2], 0))
// console.log("[2,2,2,2,2], 8: ", fourSum([2,2,2,2,2], 8))

/**
 * 解法二
 * @param {Array} nums 
 * @param {Number} target 
 * @returns Object
 */
const threeSum = (nums, target) => {
    let resSet = new Set();
    
    for(let i = 0; i < nums.length - 1; i++) {

        if(i > 0 && nums[i] === nums[i - 1]) continue;

        const target_ = target - nums[i];

        let left = i + 1, right = nums.length - 1;

        while(left < right) {
            const sum = nums[left] + nums[right];

            if(sum < target_) {
                left++;
            } else if(sum > target_) {
                right--;
            } else {
                resSet.add(`${nums[i]},${nums[left]},${nums[right]}`);
                left++;
                right--;
            }
        }
    }
    return resSet;
};

/**
 * 针对fourSum优化
 * 用时80ms
 * @param {Array} nums 
 * @param {Number} target 
 * @returns 
 */
const fourSum2 = (nums, target) => {
    const base = 4;

    if(nums.length < base) return [];

    // 对原数组排序
    nums.sort((a, b) => a - b);

    const resSet = new Set();
    
    for(let i = 0; i < nums.length - 2; i++) {

        const temp = threeSum(nums.slice(i + 1), target - nums[i]);
        if(temp.size > 0) {
            temp.forEach(item => {
                resSet.add(`${nums[i]},${item}`);
            });
        }

    }

    return Array.from(resSet, (cur) => cur.split(","));
};

// console.log("[1,0,-1,0,-2,2], 0: ", fourSum2([1,0,-1,0,-2,2], 0));
// console.log("[1,0,-1,0,-2,2] 0: ", fourSum2([1,0,-1,0,-2,2], 0))


/**
 * 解法三
 * 继续优化
 */
const fourSum3 = (nums, target) => {
    const base = 4;
    if(nums.length < base) return [];
    nums.sort((a, b) => a - b);
    const len = nums.length;
    let resSet = new Set();
    for(let i = 0; i < nums.length - 3; i++) {
        for(let j = i + 1; j < nums.length - 2; j++) {
            if(j > i + 1 && nums[j] === nums[j - 1]) continue;
            if((nums[i] + nums[j] + nums[j+1] + nums[j+2]) > target) break;
            if((nums[i] + nums[len - 3] + nums[len - 2] + nums[len - 1]) < target) continue;
            let left = j + 1, right = nums.length - 1;
            while(left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if(sum === target) {
                    resSet.add(`${nums[i]},${nums[j]},${nums[left]},${nums[right]}`);
                    while(left < right && nums[left] === nums[left + 1]) left++;
                    while(left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if(sum < target) {
                    while(left < right && nums[left] === nums[left + 1]) left++;
                    left++;
                } else{
                    while(left < right && nums[right] === nums[right - 1]) right--;
                    right--;
                }
            }
        }
    }
    return Array.from(resSet, item => item.split(","));
};

console.log("[1,0,-1,0,-2,2] 0: ", fourSum3([1,0,-1,0,-2,2], 0))
