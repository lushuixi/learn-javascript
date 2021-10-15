/**
 * javascript 03
 * 原型(Prototype)链
 * 原型链条
 * 
 */

var a = {};

// { [[Prototype]]: Object }
// constructor: ƒ Object()
// hasOwnProperty: ƒ hasOwnProperty()
// isPrototypeOf: ƒ isPrototypeOf()
// propertyIsEnumerable: ƒ propertyIsEnumerable()
// toLocaleString: ƒ toLocaleString()
// toString: ƒ toString()
// valueOf: ƒ valueOf()
// __defineGetter__: ƒ __defineGetter__()
// __defineSetter__: ƒ __defineSetter__()
// __lookupGetter__: ƒ __lookupGetter__()
// __lookupSetter__: ƒ __lookupSetter__()
// __proto__: Object
//   constructor: ƒ Object()
//   hasOwnProperty: ƒ hasOwnProperty()
//   isPrototypeOf: ƒ isPrototypeOf()
//   propertyIsEnumerable: ƒ propertyIsEnumerable()
//   toLocaleString: ƒ toLocaleString()
//   toString: ƒ toString()
//   valueOf: ƒ valueOf()
//   __defineGetter__: ƒ __defineGetter__()
//   __defineSetter__: ƒ __defineSetter__()
//   __lookupGetter__: ƒ __lookupGetter__()
//   __lookupSetter__: ƒ __lookupSetter__()
//   __proto__: null
//   get __proto__: ƒ __proto__()
//   set __proto__: ƒ __proto__()
// get __proto__: ƒ __proto__()
// set __proto__: ƒ __proto__()
// console.log("a", a);

// var b = new Object();
// function main() {
//     console.log("函数main");
// }
// b === a false
//  b.__proto__ === a.__proto__ true
// console.log("new a", b, a.constructor === a, a.toString(), main.toString()); // b === a false

function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
}

function SubType() {
    this.subPrototype = false;

    this.say = function() {
        console.log("说话了");
    }
}


SubType.prototype = new SuperType();

// SubType.prototype.getSubValue = function() {
//     return this.subPrototype;
// }

SubType.prototype.getSubValue = function() {
    return this.subPrototype;
}

/**
 * 实例 instance
 * 打印 instance
 * { subPrototype: false
 * [[Prototype]]: SuperType }
 * 
 * [[Prototype]]包含一个构造函数和[[Prototype]]: Object
 * 
 * function SubType() {....}
 * 里面定义的属性或方法都会给到instance
 * var instance = new SubType();
 * 
 * 给SubType
 */
var instance = new SubType();

// console.log("instance.getSuperValue():", instance.getSuperValue()); // true
// 实例instance上__proto__ === SubType.prototype
console.log("instance:", instance, instance.__proto__, SubType.prototype, Object.prototype.toString.call(instance)); // object

Object.keys(instance).forEach(item => {
    console.log(item, instance[item]);
})


// demo2
// var TestPrototype = function () {
//     this.propA = 1;
//     this.methodA = function() {
//         return this.propA;
//     }
// }

// TestPrototype.prototype = {
//     methodB: function() {
//         return this.propA;
//     }
// }

// var objA = new TestPrototype();
// objA.prototype.method = function() {
//     return this.propA ++;
// }

// objA.methodA() // 1
// objA.methodB() // 1
// console.log("objA", objA, objA.prototype);

function sum(a, b) {
    if(!a || !b) return;
    return a + b;
}

function ergodicSum(nums, prev, target) {
    var res;
    for(var cur = prev + 1; cur < nums.length; cur++) {
        if(sum(nums[prev], nums[cur]) === target) {
            res = [prev, cur];
            break;
        }
    }
    return res;
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var temp;
    for(var cur = 0; cur < nums.length; cur++) {
        temp = ergodicSum(nums, cur, target);
        if(temp) {
            console.log(temp);
            return;
        }
    }
};
twoSum([11,2,7,15], 9);

/**
 * 比较暴力, 两层for循环求解
 * 空间复杂度为O(n2)
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var twoSum2 = function(nums, target) {
    for(var cur = 0; cur < (nums.length - 1); cur++) {
        for(var next = prev + 1; next < nums.length; next++) {
            if(nums[prev] + nums[next] === target) {
                return [prev, next];
            }
        }
    }
    return [0, 0];
};
twoSum2([11,2,7,15], 9);

// 既然是要两数之和为target, 则这两数必然小于target
// 首先找一个比target小的数
// 然后再往后找target-找到的第一个值
var twoSum3 = function(nums, target) {
    var temp = [];
    for(var cur = 0; cur < nums.length -1; cur++) {
        if(nums[cur] > target) {
            continue;
        }
        
    }
}