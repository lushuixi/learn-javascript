### javascript 02
> 事件轮询机制

#### 事件优先级
先执行同步后执行异步, 先执行微任务后执行宏任务

#### 宏任务与微任务
- 宏任务 整体script代码, setTimeout/setInterval, I/O,
- 微任务 process.nextTick, Promise.then, await后面的代码

#### 事件轮询机制
- 同步任务在主线程按序执行
- 异步任务进入event table(事件表)注册, 当满足触发条件后, 被推入event queue(事件队列)
- 主线程空闲时, 去事件队列中查看是否有可执行的异步任务