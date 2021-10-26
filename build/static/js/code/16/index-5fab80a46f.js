/**
 * javascript
 * code 16
 * 搜索二维矩阵 II
 */

/**
 * 搜索二维矩阵 II
 * 
 * 一个m*n阶矩阵
 * 每行的元素从左到右升序排列
 * 每列的元素从上到下升序排列
 * 
 * 主对角线出发a[i][i]
 * 首先判断该元素是否是target, 如果是则返回true, 否则继续;
 * 判断该元素所在行的后面元素a[i][i+1---], 如果有该值, 则返回true, 否则继续;
 * 判断该元素所在列的后面元素a[i+1---][i+1], 如果有该值, 则返回true, 否则继续;
 * 一直到循环结束
 * 
 * 提交代码, 超出时间限制
 * 
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function(matrix, target) {
    const m = matrix.length;
    if(m <= 0) return;
    for(let i = 0; i < m; i++) {
        const temp = matrix[i][i];

        if(target === temp) {
            return true;
        }

        // 所在行
        const rowArr = matrix[i].slice(i+1) || [];
        if(hasEleInArray(rowArr, target)) {
            return true;
        }

        // 所在列 取出每个matrix[][i], 组成数组
        let colArr = [];
        for(let j = i + 1; j < m; j++) {
            if(matrix[j] && matrix[j][i]) {
                colArr.push(matrix[j][i]);
            }
        }
        if(hasEleInArray(colArr, target)) {
            return true;
        }
    }

    return false;
};

const hasEleInArray = function(arr, target) {
    if(!arr.length || !arr.includes(target)) {
        return false;
    }
    return true;
}

/**
 * 解法二
 * 暴力解决
 * 提交代码, 超出时间限制
 */
const searchMatrix2 = function(matrix, target) {
    for(let i = 0; i < matrix.length; i++) {
        if(matrix[i].includes(target)) {
            return true;
        }
    }
    return false;
}


/**
 * 优化超时限制
 * 
 * 评论区学习
 * 
 * 每行的元素从左到右升序排列
 * 每列的元素从上到下升序排列
 * 
 * 前面都理解成了二维数组 -> 最高阶数是5
 * 实际上题目是m*n阶矩阵
 * 但是用编程来写矩阵, 都是一个二维数组啊
 * 
 * 从第一列的最后一个元素开始
 * 它是该行最小的元素
 * 也是该列最大的元素
 * 
 */
const searchMatrix3 = function(matrix, target) {
    let m = 0; // 行
    let n = matrix[0].length - 1; // 列
    while(n >= 0 && m < matrix.length) {
        const temp = matrix[m][n];
        if(temp === target) {
            return true;
        }
        if(temp > target) {
            // 往上走, 所在列
            n--;
            continue;
        }
        if(temp < target) {
            m++;
            continue;
        }
    }
    return false;
}

/**
 * 提交记录
 * 别人的成功记录
 */
const searchMatrix4 = function(matrix, target) {
    return finfTarget(0, 0, matrix,target);
};
function finfTarget(x,y,matrix,target){
    if(matrix[x][y]==target){
        return true
    }
    if(matrix[x][y]>target){
        matrix[x][y] = Infinity
        return false
    }
    matrix[x][y] = Infinity
    let flag = false
    // 所在行往下走
    if(x<matrix.length-1){
        flag = finfTarget(x+1,y,matrix,target)
    }
    // 所在列往下走
    if(!flag&&y<matrix[0].length-1){
        flag = finfTarget(x,y+1,matrix,target)
    }
    return flag
}

// console.log([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5, 
//     searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5)
// );

// console.log([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20, 
//     searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 20)
// );

console.log([[0,0,0],[2,7,9],[7,8,11]],7,
    searchMatrix4([[0,0,0],[2,7,9],[7,8,11]], 7));