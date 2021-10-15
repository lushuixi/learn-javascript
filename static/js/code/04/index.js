/**
 * javascript
 * code 04
 * 最长回文子串
 * 
 * 什么是回文子串呢?
 * ---正读和反读都一样的字符串(对称子串)
 * 
 * 回文: palindromic
 * 
 */

/**
 * 求给定字符串的最长回文子串
 * 例如 s="babad"
 * 最大回文子串 maxPalindromic = ""
 * ["b", "a", "b", "a", "d"]
 * 第一轮
 * "b" -> "b" 是回文子串, maxPalindromic="b"
 * "a" -> "ba" 不是回文子串
 * "b" -> "bab" 是回文子串, maxPalindromic="bab"
 * "a" -> "baba" 不是回文子串,
 * "d" -> "babad" 不是回文子串
 * 第二轮
 * "a" -> "a" 是回文子串, maxPalindromic="bab"
 * "b" -> "ab" 不是回文子串,
 * "a" -> "aba" 是回文子串, ------------------------ 也是最大的
 * "d" -> "abad" 不是回文子串
 * 第三轮
 * "b" -> "b" 是回文子串
 * "a" -> "ba" 不是回文子串
 * "d" -> "bad" 不是回文子串
 * 第四轮
 * "a" -> "a" 是回文子串
 * "d" -> "ad" 不是回文子串
 * 第五轮
 * "d" -> "d" 是回文子串
 * 
 * let curPalindrome = [1 2 3], maxPalindromic = [];
 * maxPalindromic = curPalindrome; // 传递的是地址引用, 两者指的是同一个地址, 一个变都变
 * maxPalindromic = [...curPalindrome]; / 复制的是内容而不是地址, 两者不同, 一个变不影响另外一个
 * 
 * 遍历判断是否是回文子串
 * 暴力解决
 * 时间复杂度为O(n3)[n的三次方, 两层循环遍历, 一层查找字符串是否为回文串]
 * 空间复杂度为O(1)
 * 
 * @param {String} s 
 * 
 */
const longestPalindrome = function(s) {
    if(!s || typeof s !== "string") return "";
    const strArray = s.split("");
    const hasPalindrome = str => {
        let i = 0, j = str.length - 1;
        while(i <= j) {
            if(str[i] !== str[j]) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    };
    let curPalindrome = [], maxPalindromic = [];
    for(let k = 0, kL = strArray.length; k < kL; k++) {
        curPalindrome = [];
        for(let i = k, j = strArray.length; i < j; i++) {
            curPalindrome.push(strArray[i]);
            // hasPalindrome(curPalindrome) && curPalindrome.length >= maxPalindromic.length 如果长度相同则取后者
            // hasPalindrome(curPalindrome) && curPalindrome.length > maxPalindromic.length 如果长度相同则不变,取前者
            if(hasPalindrome(curPalindrome) && curPalindrome.length > maxPalindromic.length) {
                maxPalindromic = [...curPalindrome];
            }
        }
    }
    return maxPalindromic.join("");
};

console.log(longestPalindrome("babad"));
console.log("PATZJUJZTACCBCC", longestPalindrome("PATZJUJZTACCBCC"))

/**
 * 最长回文子串
 * 优化
 * 思想
 * 根据回文子串的概念逆向思维
 * 以该字符为中心, 判断最大的回文字串
 * 例如s = "babad" 长度为5
 * "b" -> "b", "ba" --------------------- i = 0
 * "a" -> "a", "ba", "bab" -> "bab"
 * "b" -> "b", "ab", "ba", "aba", "babad" -> "aba"
 * "a" -> "a", "ba", "ad", "bad"
 * "d" -> "d", "da" ----------------------- i = 0
 * 
 * 两个指针一块走
 * 如果有相同长度的回文子串取前者
 * 
 * 复杂度分析:
 * 时间复杂度: O(n2)(n的二次方)
 * 空间复杂度: O(1)
 */
const longestPalindrome2 = function(s) {
    if(!s || typeof s !== "string")  return "";
    // const strArr = s.split("");
    let maxPalindromic;
    /**
     * s = "babad"
     * 
     * i = 0, j = 0 -> "b"
     * strArr[i] = strArr[j], 再判断strArr[i-1]和strArr[j+1]是否相等, 由于i-1<0则返回
     * 
     * i = 0, j = 1 -> "ba"
     * "ba", 两者不同, 不是回文
     * 
     * i = 1, j = 1 -> "a", "bab"
     * "a", 是回文
     * i-1=0, j+1=2
     * "b", "b", 相同, [0, 2]是回文
     * 
     * i = 1, j = 2 -> "baba"
     * "a","b", 不是回文, 不再往后进行了
     * 
     * i = 2, j = 2 -> "b", "abad"
     * "b","b", 相同,是回文
     * i = 2, j = 3
     * "b","a", 不相同, 不再往后进行了
     * 
     * i = 3, j = 3 -> "a", "ad", "ad"
     * "a","a" -> "a", 是回文
     * i = 3, j = 4
     * "a","d" -> "ad", 不相同, 不是回文, 以"ad"为中心的子串也比不是回文, 不再往后进行了
     * 如果相同则向四周扩散 i = 2, j = 5, 判断2和5对应的字符是否相等, 直到
     * i--, j++
     * 直到i<0,j>=length
     * 
     * i = 4, j = 4 -> 
     * 
     * 以i和j为中心向两周扩散
     * 如果i和j对应字符相同
     *  - 如果i-1<0则说明i=0(左侧无数据) | j+1 >= length(右侧无数据, j=length-1),则退出
     *  - 则判断i-1和j+1对应字符是否相同 <------------|
     *     - 若不同, 则必不是回文字符串, 退出          |
     *     - 若相同, 则继续判断---------------------->|
     * 
     * 判断i和j对应字符是否相同
     * i和j表示两端
     * 
     * 如果i和j对应的字符相同, 则[i,j]是回文字符串
     * (因为已经判断过[i+1, j-1]是回文字符串了)
     * 
     * @param {*} i 
     * @param {*} j 
     * @returns 回文子串
     * 
     */
    const expandPalindromic = function(i, j) {
        if(i < 0 || j >= s.length) return;
        if(s[i] !== s[j]) return;
        if(s[i] === s[j]) {
            // 相等则说明字符串i到j是回文字符串
            // 判断其长度, 取大者
            let temp = s.substring(i, j+1);
            maxPalindromic = maxPalindromic ? maxPalindromic.length < (j - i + 1) ? temp : maxPalindromic : temp;
            // 继续下一轮回文字符判断
            expandPalindromic(i-1, j+1);
        }
    };
    
    for(let i = 0, j = s.length; i < j; i++) {
        expandPalindromic(i, i); // 以i为中心, 奇数个字符
        expandPalindromic(i, i + 1); // 以i,i+1为中心, 偶数个字符
    }

    return maxPalindromic;
};

console.log("longestPalindrome2", "babad", longestPalindrome2("babad"));

/**
 * 最长回文子串
 * 
 * 实际上,在longestPalindrome
 * 两层for循环的目的是从k到i的子串, 再通过hasPalindrome来判断该子串是否是回文子串
 * 现在我们把这部分抽离出来
 * 
 * 根据[动态规划]策略
 * 记dp[i, j]为从i到j的字符串是否为回文字符串
 * 如果str[i] !== str[j], 则dp[i,j]=0
 * 如果str[i] = str[j], 再计算dp[i+1, j-1]
 * 
 * 得到公式:
 * dp[i, j] = 0, str[i] = str[j]
 * dp[i, j] = dp[i+1, j-1], str[i] !== str[j]
 * 
 * 
 * @param {String} s
 * 
 */
// const longestPalindrome3 = function(s) {
//     if(!s || typeof s !== "string") return "";

// };

// longestPalindrome3("babad");


/**
 * 最长回文子串
 * 优化
 * 使时间复杂度呈线性
 * Manacher算法(马拉车算法, 由Manacher发明)
 * 
 * 本质上是使用了遍历字符,以该字符为中心向两边查找
 * 不同的是增加了预处理
 * 
 * 
 * 
 * 复杂度分析:
 * 时间复杂度: O(n)
 * 
 */
const longestPalindrome4 = function(s) {

};
