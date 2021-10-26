/**
 * javascript
 * code 19
 * 下一个更大元素 I
 * 
 * array.indexOf(x) 所有浏览器均支持
 * 在该数组中查找元素值为x的第一个元素所在下标(从0开始)(首次出现的元素)
 * 如果没有找到返回-1
 * 
 * array.findIndex(function(currentValue, index, arr), thisValue) IE12+
 * - 回调函数, 返回根据回调函数获得的元素所在下标(从0开始)(首次出现的元素)
 * - 如果没有找到则返回-1
 * - 不改变数组的原始值
 * - 对于空数组, 是不会执行的
 */

/**
 * 给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集
 * 请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值
 * nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1
 * 
 * 注意两个点: 
 *  - 找到nums1中的元素这nums2中的位置
 *  - 从该位置的下一个位置开始, 往后走, 找到第一个大于该元素的值(两者不一定是挨着的), 返回该值, 其他情况返回-1
 * 
 * nums1 = [4,1,2], nums2 = [1,3,4,2]
 * 4 -> 在nums2中在4的位置右边没有比4更大的值, 返回-1
 * 1 -> 在nums2中在1的右边有一个更大的值是3, 返回3
 * 2 -> 在nums3中在2的右边无值, 返回-1
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const nextGreaterElement = function(nums1, nums2) {
    let res = [];
    for(let i = 0; i < nums1.length; i++) {
        const temp = findNextElement(nums1[i], nums2);
        if(typeof temp === "number") {
            res.push(temp);
        }
    }
    return res;
};

const findNextElement = function(x, nums) {
    let k = nums.indexOf(x);
    let res = -1;
    while(k >= 0 && k < nums.length) {
        if((nums[k] !== null || nums[k] !== undefined) && nums[k] > x) {
            res = nums[k];
            break;
        }
        k++;
    }
    return res;
}

/**
 * 拓展思路
 * 两外一种解法
 * 既然是整数, 那么可以排序
 * 但是排完序后, 仍然是查找所在位置, 往后找第一个大的元素
 */
console.log([4,1,2],[1,3,4,2], nextGreaterElement([4,1,2],[1,3,4,2]));
console.log([1,3,5,2,4], [6,5,4,3,2,1,7], nextGreaterElement([1,3,5,2,4], [6,5,4,3,2,1,7])); // [7,7,7,7,7]