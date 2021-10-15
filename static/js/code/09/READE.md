### 三数之和
> 来源: 力扣(https://leetcode-cn.com/problems/3sum/)

#### 题目描述
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

#### 示例一
```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

#### 示例二
```
输入：nums = []
输出：[]
```

#### 示例三
```
输入：nums = [0]
输出：[]
```

#### 提示
0 <= nums.length <= 3000
-105 <= nums[i] <= 105

#### 关键点
- 给定的整数数组不一定是有序的
- 三数之和为0
- 和为0的三数组成的数组中又是不可重复的