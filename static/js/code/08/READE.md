### 回文数
> 来源: 力扣(https://leetcode-cn.com/problems/palindrome-number/)

#### 题目描述
给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。

#### 示例一
```
输入：x = 121
输出：true
```

#### 示例二
```
输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```

#### 示例三
```
输入：x = 10
输出：false
解释：从右向左读, 为 01 。因此它不是一个回文数。
```

#### 示例四
```
输入：x = -101
输出：false
```

#### 提示
-231 <= x <= 231 - 1