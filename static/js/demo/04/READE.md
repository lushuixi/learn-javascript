## 声明变量
变量类型
基本类型: boolean, string, number, null, undefined -> 按值传递
引用类型: object -> 按地址(引用)传递

### var


### let 和 const
有作用域, 只在所在代码块内有效

#### let 定义变量

#### const 定义常量
若为基本类型, 不可修改
若为引用类型, 可修改(因为引用类型是按地址传递的, 不变的是地址, 即地址不可被更改, 但可以操作数据本身)

### 块级作用域
#### 使用理由
- 内层变量可能会覆盖外层变量
- 用来计数的循环变量泄露为全局变量

#### 特点
- let实际上为 JavaScript 新增了块级作用域, 表示外层代码块不受内层代码块的影响
- 允许块级作用域的任意嵌套 {{{{}}}}
- 内层作用域可以定义外层作用域的同名变量
- 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了
```
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```