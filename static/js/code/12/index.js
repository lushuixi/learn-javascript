/**
 * javascript
 * es6
 * code 12
 * 电话号码的字母组合
 */

/**
 * 电话号码的字母组合
 * 如果长度为2, 就是两层循环
 * 如果长度为3, 就是三层循环
 * 如果长度为4, 就是四层循环
 * ...
 * 
 * 解法一: 利用reduce性质, 累加
 * 
 * 
 * 例如: 
 * disgits: "23"
 * 2 -> ["a", "b", "c"]
 * 3 -> ["d", "e", "f"]
 * 
 * 排列组合
 * 
 * 
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function(digits) {
    if(!digits) return [];

    // 数字字母键对象
    const data = {
        "2": ["a", "b", "c"],
        "3": ["d", "e", "f"],
        "4": ["g", "h", "i"],
        "5": ["j", "k", "l"],
        "6": ["m", "n", "o"],
        "7": ["p", "q", "r", "s"],
        "8": ["t", "u", "v"],
        "9": ["w", "x", "y", "z"],
    };

    // len控制循环次数
    const len = digits.length;

    // 长度为1
    if(len === 1) return data[digits];

    // 长度>=2
    // 可将其转化为两个两个的
    // 根据数字生成字母数组
    return ((digits.split(""))
            .map(item => data[item])
        ).reduce((per, cur) => {
            if(per.length === 0) return cur;
            let res = [];
            per.forEach(pItem => {
                cur.forEach(cItem => {
                    res.push(pItem + "" + cItem);
                });
            });
            return res;
        }, []);
};

/**
 * 解法二
 * 参考网上已提交的记录
 */
const letterCombinations2 = function(digits) {
    if(!digits) return [];

    // 存储数字字母对应关系
    const data = {
        "2": ["a", "b", "c"],
        "3": ["d", "e", "f"],
        "4": ["g", "h", "i"],
        "5": ["j", "k", "l"],
        "6": ["m", "n", "o"],
        "7": ["p", "q", "r", "s"],
        "8": ["t", "u", "v"],
        "9": ["w", "x", "y", "z"],
    };

    // res保存结果, re临时保存每层的结果
    let res = [], re = [];

    for(let k = 0; k < digits.length; k++) {
        // 取得字母
        const temp = data[digits[k]];
        for(let i = 0; i < temp.length; i++) {
            if(res.length === 0) {
                // 如果是第一层, 则直接添加
                re.push(temp[i]);
            } else {
                // 如果是非第一层, 就要在上一层的基础上进行组合
                for(let j = 0; j < res.length; j++) {
                    re.push(res[j] + temp[i]);
                }
            }
        }
        res = re;
        re = [];
    }

    return res;
};

console.log("23", letterCombinations2("234"))
console.log("", letterCombinations2("")) 

{
    
}