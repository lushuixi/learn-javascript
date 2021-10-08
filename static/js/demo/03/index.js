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
console.log("a", a);

var b = new Object();
function main() {
    console.log("函数main");
}
// b === a false
//  b.__proto__ === a.__proto__ true
console.log("new a", b, a.constructor === a, a.toString(), main.toString()); // b === a false