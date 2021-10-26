/**
 * javascript
 * demo 04
 * 声明变量
 */

/**
 * var与let区别
 * for循环的计数器
 */

// let
let a = [];
for(let i = 0; i < 10; i++) {
    a.push(i);
}
console.log(a);

// var
// 用来计数的循环变量泄露为全局变量
var b = [];
for(var j = 0; j < 10; j++) {
    b.push(j);
}
console.log(b);
// 仍然可以访问到j, 泄露成了全局变量
console.log(j);

// var
var c = [];
for(var k = 0; k < 10; k++) {
    c[k] = function () {
        console.log(k);
    };
}
c[6]();
console.log(k);

// let 块级作用域
let d = [];
for(let u = 0; u < 10; u++) {
    d[u] = function () {
        console.log(u);
    };
}
d[6]();