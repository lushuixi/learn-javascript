### 四数之和
> 来源: 力扣(https://leetcode-cn.com/problems/4sum/)

#### 题目描述
给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] ：

0 <= a, b, c, d < n
a、b、c 和 d 互不相同
nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。

#### 示例一
```
输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

#### 示例二
```
输入：nums = [2,2,2,2,2], target = 8
输出：[[2,2,2,2]]
```

#### 提示
1 <= nums.length <= 200
-109 <= nums[i] <= 109
-109 <= target <= 109