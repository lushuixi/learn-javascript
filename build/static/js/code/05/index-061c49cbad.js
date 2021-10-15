/**
 * javascript
 * code 05
 * Z字形变换
 * 
 * 1. 什么是Z字形变换?
 * s = "PAYPALISHIRING", numRows = 3
 * 以从上到下,从从左到右的顺序进行Z字形排列, 得到如下排列
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 输出"PAHNAPLSIIGYIR"
 * 
 * 如何用算法形容呢?
 * 
 * 排列的时候是先上到下, 从左到右
 * 但输出的时候是先从左到右, 从上到下
 */

/**
 * Z字形变换
 * 
 * 如何保存排列呢? PAYPALISHIRING
 * PAY -> PAY 0,1,2
 * #P# -> PAPY 3
 * ALI -> PAAPLVI 
 * #S# -> 
 * HIR
 * #I#
 * NG#
 * 
 * 从排列入手
 * P(0)      A(4)       H(8)        N(12)
 * A(1) P(3) L(5) S(7)  I(9) I(11)  G(13)
 * Y(2)      I(6)       R(10)
 * 
 * 第一趟 0,1,2,3 -> 0,1,3.2 -> PAPY
 * 第二趟 4,5,6,7 -> 0,4,1,3,5,7,2,6 -> PAAPLYI
 * 第三趟 8,9,10,11 -> 0,4,8,1,3,5,7,9,11,2,6,10 -> PAHAPLSIYIR
 * 第四趟 12,13 -> 0,4,8,12,1,3,5,7,9,11,13,2,6,10,13 -> PAHNAPLSIIGYIR --- 没有什么规律啊
 * 
 * 
 * 这种排列如何存储呢?
 * 
 * numRows = 3, 则相邻两列有四个数据 3 + 1 = 4 -> 4 = 3 + (3 - 2)
 * 0,4,8,12 -> 第一行取下标为(numRows + 1)k的数据, k从0开始; 以4为公差, k = 0, 1, 2, 3
 * 1,3,5,7,9,11,13 -> 第二行取下标为(2k + 1)的数据, k从0开始; 以2为公差, k = 0, 1, 2, 3, 4, 5, 6
 * 2,6,10 -> 第三行取下标为(2 + (numRows + 1)k)的数据, k从0开始; 以4为公差, k =0, 1, 3
 * 
 * numRows = 4, 相邻两列有五个数据 4 + 1 = 5 -> 6 = 4 + (4 - 2)
 * PAYPALISHIRING
 * P(0)           I(6)             N(12)
 * A(1)      L(5) S(7)       I(11) G(13)
 * Y(2) A(4)      H(8) R(10)
 * P(3)           I(9)
 * 
 * 第一趟 0,1,2,3,4,5 -> 0,1,5,2,4,3 k = 0,
 * 第二趟 6,7,8,9,10,11 -> 0,6,1,5,7,11,2,4,8,10 k = 6
 * 第三趟 12,13 -> 0,6,12,1,5,7,11,13,2,4,8,10,3,9 k =12
 * 
 * 13, (k + 2 * numRows - 2)
 * 
 * 0, 6, 12 -> (2 * numRows - 2)k, 公差为6
 * 1, 5, 7, 11, 13, {4, 2}
 * 2, 4, 8, 10, {2, 4}
 * 3, 9, {6}
 * 
 * numRows = 5, 相邻两列有8个数据 5 + (5 - 2) = 8
 * 
 * 用二维数据保存排列
 * 
 * @param {String} s 
 * @param {Number} numRows 
 * @returns String
 */
const convert = function(s, numRows) {
    if(!s || typeof s !== "string" || !s.length || numRows <= 0) return;
    if(numRows === 1 || s.length === 1) return s;
    // 保存排列
    let rank = [], k = 0;
    // ...
};

/**
 * 该题评论下一解法
 * @param {String} s 
 * @param {Number} numRows 
 * @returns String
 */
const convert2 = function(s, numRows) {
    if(!s || typeof s !== "string" || !s.length || numRows <= 0) return;
    if(numRows === 1 || s.length === 1) return s;

    // 保存排列
    let rank = [], k = 0;

    for(let i = 0; i < numRows; i++) {
        rank[i] = "";
    }

    for(let i = 0, j = s.length; i < j; i++) {
        let ans = Math.floor(i / (numRows - 1)), // Math.floor目的是为了取到整数
            cur = i % (numRows - 1);
        console.log(ans, cur, i);
        if(ans % 2 === 0) {
            // 前n-1位
            // 向rank指定位置处添加元素s[i]
            // cur添加?(cur + 1)插入
            // tempIdx = s[cur] ? cur + 1 : cur;
            // rank.splice(tempIdx, 0, s[i]);
            rank[cur] += s[i];
        } else {
            // 后n-1位
            // tempIdx = s[numRows - cur - 1] ? numRows - cur : numRows - cur - 1;
            // rank.splice(tempIdx, 0, s[i]);
            rank[numRows - cur - 1] += s[i];
        }
    }

    let res = "";

    for(let i = 0; i < numRows; i++) {
        res += rank[i]
    }
    
    console.log("遍历结果---", s, rank, res);
};

// PAYPALISHIRING
/**
 * s = "PAYPALISHIRING", numRows = 3, numRows - 1 = 2
 * 循环遍历s, rank记录当前Z字形变换结果
 * i = 0, 0/2=0, ant = 0, cur = 0, 添加, ["P"]
 * i = 1, 1/2=0, ant = 0, cur = 1, 添加, ["P", "A"]
 * i = 2, 2/2=0, ant = 1, cur = 0, 插入3-0-1=2, ["P", "A", "Y"]
 * 
 * i = 3, 3/2=1, ant = 1, cur = 1, 插入3-1-1 + 1 = 2, ["P", "A", " P", "Y"]
 * 
 * 
 * i = 4, 4/2=2, ant = 2, cur = 0, 插入0+1=1, ["P", "A", "A", "P", "Y"]
 * i = 5, 5/2=2, ant = 2.5, cur = 1, 插入3-1-1=1 -> 2, ["P", "A", "L", "A", "P", "Y"]-------------
 * i = 6, 6/2=3, ant = 3, cur = 0, 插入3-0-1=2 -> 3, ["P", "A", "L", "I", "A", "P", "Y"]
 * 
 * i = 7, 7/2=3, ant = 3, cur = 1, 插入3-1-1=1 -> 2, ["P", "A", "S", "L", "I", "A", "P", "Y"]
 * 
 * 
 * i = 8, 8/2=4, ant = 0, cur = 0, 插入0 -> 1, ["P", "H", "A", "S", "L", "I", "A", "P", "Y"]
 * 
 * n = numRows = 3, 
 * 分段, 每段有(n + n - 2) = (2n - 2) 个数据
 * 其中, 前n个数据是顺序的排列
 * 后(n - 2)个数据是倒序排列的
 * 0   4   8    12     0   4   8
 * 1 3 5 7 9 11 13  =》1 3 5 7 9
 * 2   6   10   14     2   6   10
 * 
 * 0     6       12                     0   6    12
 * 1   5 7    11 13   这个转变非常重要   1 5 7 11 13
 * 2 4   8 10        ================》 2 4 8 10
 * 3     9                              3   9
 * 
 * PAYPALISHIRING
*/
convert2("PAYPALISHIRING", 4);