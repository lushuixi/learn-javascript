/**
 * javascript
 * code 03
 * 寻找两个正序数组的中位数
 * 
 */

/**
 * 寻找两个正序数组的中位数
 * num1.length + num2.length 若为奇数, 则取中位数(num1.length + num2.length)/2
 * 若为偶数, 则取中间两位数的平均值
 * 
 * number.toFixed(n) 四舍五入保留n位小数
 * 保存五位小数点
 * 
 * @param {Array} num1 
 * @param {Array} num2 
 * 
 */
const findMedianSortedArrays = function(num1, num2) {
    const len = num1.length + num2.length;
    if(len <= 0) return (0).toFixed(5);
    let middleMin = 0, middleMax = 0;
    // 定义中值
    (len % 2) === 0 ? (middleMin = Math.floor(len / 2), middleMax = middleMin + 1) : middleMin = middleMax = Math.floor((len + 1) / 2);
    let n1 = 0, n2 = 0, curIdx = 1, temp = 0, middleMinVal, middleMaxVal;
    while(n1 < num1.length || n2 < num2.length) {
        if(n1 >= num1.length) {
            temp = num2[n2];
            n2++;
        } else if(n2 >= num2.length) {
            temp = num1[n1];
            n1++;
        } else if(num1[n1] >= num2[n2]) {
            temp = num2[n2];
            n2++;
        } else {
            temp = num1[n1];
            n1++;
        }

        if(curIdx === middleMin) {
            middleMinVal = temp;
        }
        if(curIdx === middleMax) {
            middleMaxVal = temp;
            break;
        }
        curIdx++;
    }
    return ((middleMinVal + middleMaxVal) / 2).toFixed(5);
};

console.log(findMedianSortedArrays([1,3], [2]));
console.log(findMedianSortedArrays([1, 2], [3, 4]));
console.log(findMedianSortedArrays([0, 0], [0, 0]));