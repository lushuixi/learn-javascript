/**
 * javascript
 * code 02
 * 无重复字符的最长子串
 * "abcabcbb" -> "abc" -> 3
 * "a", "" -> "a" len = 1
 * "b", "a" -> "ab" len = 2
 * "c", "ab", -> "abc" len = 3
 * "a", "abc" -> 有重复字符串, 所以清空 -> "a"
 * "b", "a" -> "ab",
 * "c", "ab" -> "abc", len = 3
 * "b", "abc" -> 有重复字符串, 所以清空, 由于长度跟上一个相同, 所以len=3 -> "b"
 * "b", "b" -> 有重复字符串, 所以清空, 由于len = 1 < len = 3, 取最大值
 * 
 * 如何判断有无重复字符串?
 * 判断一个字符串中是否含有某字符 str.includes(s);
 * 
 */

/**
 * 统计无重复字符的最长子串的长度
 * @param {String} s 
 * @returns Number
 * 错误输出 
 * dvdf -> maxStr = dv/df -> 2
 * 实际上maxStr=vdf -> 3
 */
var lengthOfLongestSubstring = function(s) {
    var prevStr, curStr = "";
    for(var i = 0, j = s.length; i < j; i++) {
        if(!curStr.includes(s[i])) {
            curStr = curStr + "" + s[i];
            continue;
        }
        // prevStr记录上一个最大长度的无重复的子串
        prevStr = prevStr ? curStr.length > prevStr.length ? curStr : prevStr : curStr;
        curStr = "" + s[i];
    }
    var maxStr = prevStr ? curStr.length > prevStr.length ? curStr : prevStr : curStr;
    return maxStr.length;
}

var str = "abcabcbb";
console.log(str, lengthOfLongestSubstring(str));

/**
 * 针对上述的问题
 * @param {String} s 
 * @returns Number
 * Array.slice(start, end)
 * start: 0表示第一个元素, 从第一个元素开始切, 但是会包含第一个元素的
 * end: 可选, 如果不选则为到数组末尾的所有元素
 * 不改变原数组
 */
const lengthOfLongestSubstring2 = function(s) {
    let prevStr = null, curStr = [];
    (s.split("")).forEach(item => {
        let idx = curStr.findIndex(cIt => cIt === item);
        if(idx < 0) {
            curStr.push(item);
            return;
        }
        prevStr = prevStr ? curStr.length > prevStr.length ? curStr : prevStr : curStr;
        curStr = curStr.slice(idx + 1);
        curStr.push(item);
    });
    let maxStr = prevStr ? curStr.length > prevStr.length ? curStr : prevStr : curStr;
    return maxStr.length;
}

console.log("dvdf", lengthOfLongestSubstring2("dvdf"));