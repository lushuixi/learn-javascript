### javascript 02
> 事件轮询机制

#### 事件优先级
先执行同步后执行异步, 先执行微任务后执行宏任务

#### 宏任务与微任务(均为异步任务)
- 宏任务 整体script代码, setTimeout/setInterval, I/O,
- 微任务 process.nextTick, Promise.then, await后面的代码
- 宏任务与微任务区别
    宏任务 -> 执行(同步任务直接执行, 宏任务加入宏任务队列, 微任务加入微任务队列)结束 -> 
        是否有可执行的微任务 -> 若有, 执行所有微任务, 执行结束后开启下一个宏任务;若无, 开启下一个宏任务

#### 事件轮询机制
- 同步任务在主线程按序执行
- 异步任务进入event table(事件表)注册, 当满足触发条件后, 被推入event queue(事件队列)
- 主线程空闲时, 去事件队列中查看是否有可执行的异步任务
- Event Loop(事件循环)
    任务进入执行栈 -> 同步任务?异步任务 -> 
        同步任务进入主线程 -> 执行同步任务,任务全部执行结束完毕 -> 读取Event queue任务队列中的结果进入主线程执行, 继续判断同步任务?异步任务?;
        异步任务进入Event table进行注册回调函数 -> 回调函数进入Event queue(任务队列)

#### 案例
```js
console.log('1');

setTimeout(function() {
    console.log('2');
    // process.nextTick(function() {
    //     console.log('3');
    // })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
// process.nextTick(function() {
//     console.log('6');
// })
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})
 
setTimeout(function() {
    console.log('9');
    // process.nextTick(function() {
    //     console.log('10');
    // })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
```

#### 答案
```
1
7
8
2
4
5
9
11
12
```

#### 解读
第一轮事件循环流程分析如下：

整体script作为第一个宏任务进入主线程，遇到console.log，输出1。
遇到setTimeout，其回调函数被分发到宏任务Event Queue中。我们暂且记为setTimeout1。
遇到process.nextTick()，其回调函数被分发到微任务Event Queue中。我们记为process1。
遇到Promise，new Promise直接执行，输出7。then被分发到微任务Event Queue中。我们记为then1。
又遇到了setTimeout，其回调函数被分发到宏任务Event Queue中，我们记为setTimeout2。

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------- |
| setTimeout1       | then1             |
| setTimeout2       |                   |

上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。

我们发现了then1一个微任务。

执行then1，输出8。

好了，第一轮事件循环正式结束，这一轮的结果是输出1，7，8。那么第二轮时间循环从setTimeout1宏任务开始：

首先输出2。
new Promise立即执行输出4，then也分发到微任务Event Queue中，记为then2

| 宏任务Event Queue | 微任务Event Queue |
| ----------------- | ----------------- |
| setTimeout2       | then3             |

第三轮事件循环宏任务执行结束，执行一个微任务then3。
输出12。


第三轮事件循环结束，第三轮输出9，11，12。


整段代码，共进行了三次事件循环，完整的输出为1，7，8，2，4，5，9，11，12。(请注意，node环境下的事件监听依赖libuv与前端环境不完全相同，输出顺序可能会有误差)

