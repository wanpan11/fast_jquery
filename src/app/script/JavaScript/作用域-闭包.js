// https://juejin.im/post/6844903474212143117#heading-0     面试文章
// https://juejin.im/post/6844903682283143181               执行原理说明

// for (var i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(new Date(), i);
//     }, 1000);
// }

// console.log(new Date(), i);
// fro 调用了5次 setTimeout 这5次都会在1秒后执行
// setTimeout里面的log执行时 for循环已经走完了 所以此时的i是5 同时执行了5次log
// 故此时输出 5->5 5 5 5 5


// 使用闭包解决 i没有传递到定时器内部的问题
// for (var i = 0; i < 5; i++) {
//     (function (i) {
//         setTimeout(() => {
//             console.log(new Date(), i);
//         }, 1000);
//     })(i)
// }

// console.log(new Date(), i);

// 查看API 得知定时器可以传递(fn,time,ars1,ars2) 方法,延迟时间，多个参数  
// for (var i = 0; i < 5; i++) {
//     setTimeout((i) => {
//         console.log(new Date(), i);
//     }, 1000, i);
// }

// console.log(new Date(), i);


// var替换成let 使用let的作用域 1秒后定时器工作时 i已经没有了 再次回到循环是从新声明 i=0 开始
for (let i = 0; i < 5; i++) {
    console.log('定时器外部的i' + i)
    setTimeout(function () {
        console.log(i);
        console.log(new Date, i);
    }, 1000);
}
// var 1秒后定时器工作时 全局变量i已经存在了 i=5 循环不会重申
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(new Date(), i);
    }, 1000);
}

// console.log(new Date, i);




