/**
 * JavaScript 01
 * 同步与异步
 * 
 * 任务
 *  - 同步任务 -> 立即执行
 *  - 异步任务 -> 宏任务 + 微任务
 * 
 * JavaScript核心:单线程
 * 单线程意味着后一个任务的执行必须等前一个任务执行完成后方可执行, 排队相继执行(中间干不了别的事情, 只能等)
 * 
 * 同步(synchronous)
 * -------------------- (时间线)
 * A->B->C->D->...
 * 
 * 异步(asynchronous)
 * -------------------- (时间线)
 * A---
 * B--
 * C-
 * 
* 同步方法: 调用者必须等到方法调用返回后, 得到预期结果, 后面的代码才能执行
 * 异步方法: 一旦调用, 便立即返回(没有得到预期结果), 后面代码继续执行, 等到异步操作完成后执行回调
 * 
 * 异步是相对于同步而言的--------------------------------------------------------------------
 *  - 同步: 执行顺序与代码顺序相同
 *  - 异步: 执行顺序与代码顺序不同
 * 
 * 异步编程的前世今生
 *  - 回调地狱(多个回调函数嵌套)
 *  - Promise(社区)[将回调函数嵌套改成链式调用, 一堆then, 语义不清晰]
 *  - async/await[解决Promise的一串then问题, 更加语义化, 使异步代码写起来更像同步代码, 更易理解]
 * 
 * 
 * 回调地狱
 * Promise表示一个异步操作的结果(成功或失败)
 * Promise的then链式回调
 * Promise对象 
 * 将异步操作以同步操作的流程表现出来, 避免层层嵌套的回调函数
 * 个人非常好奇???
 * Promise构造函数是同步操作, 是如何将异步操作转化为同步操作的?
 * 构造函数包括两个参数resolve(解析)、 reject(拒绝)的回调, 在回调中执行一些操作(例如异步),
 * 如果一切都正常, 则调用resolve, 否则调用reject
 * 
 * Promise.then这个异步任务, 只是与promise后面的代码是异步的(后面的代码先执行, then里面的代码再执行, 执行顺序与代码顺序不同, 从而形成异步)
 * 而且Promise构造函数中的代码是立即执行的, 也就是会得到预期的结果, 通过resolve通知状态的更改
 * 
 */

// console.log("同步与异步"); // 1

function promiseTest() {
    return new Promise((resolve) => {
        console.log("promise的操作"); // 2
        resolve(1);
    });
}

// console.log("hellolushuixi"); // 3
// // 这里我使用了多个then链式调用, 下一个then需要根据上一个then的操作结果进行
// // 缺点: 一串then
// promiseTest()
// .then((res) => {
//     // 需要那到promiseTest()执行后的结果进行下一步的操作
//     console.log("primiseTest执行回调9---", res); // 4
//     return res + 1;
// })
// .then((res) => {
//     console.log("promiseTest执行回调", res);
//     return res + 1;
// })
// .then((res) => {
//     console.log("promiseTest执行回调", res);
//     return res + 1;
// })
// .then((res) => {
//     console.log("promiseTest执行回调", res);
//     return res + 1;
// })
// .then((res) => {
//     console.log("promiseTest执行回调", res);
// });

// // 这行代码放在promiseTest()执行前面效果仍是一样的
console.log("hellolushuixi"); // 3

function normalFun() {
    console.log("normalFun---");
    return "normalFun";
}

// 总感觉异步操作的异步指的是它的回调和后面的代码之间是异步的
// async/await 使异步代码变得更像是同步的(解决promise的缺陷:语义不清晰)
// await这一行代码, 后面的代码被放入微任务
// async 说明该方法是一个异步方法, 与该方法后面的代码隔离开来; 相当于return new Promise((resolve) => {...操作...; resolve(return结果)})
// await 等待一个(异步或同步)方法的执行, 相当于promise的构造函数, 会立即执行(同步任务)
// 执行结束后将后面几行代码放在微任务里, 继续执行异步函数后面的代码(从而形成异步), 即后面的这几行代码相当于promise的then, 被放到微任务里
async function main() {
    // const mainRes = await promiseTest();
    const mainRes = await normalFun();
    // await后面的代码被放入微任务
    console.log("主函数", mainRes);
    // 返回的数据会被包在promise里, 即返回一个promise对象
    return mainRes;
}

// main();
main()
.then(res => {
    console.log("main结果", res);
});

console.log("优雅的结束了");