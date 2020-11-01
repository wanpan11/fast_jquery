// javascipt 原型链 构造函数   https://juejin.im/post/6844903984335945736#heading-19

function fun1() { };
const fun2 = function () { };
const fun3 = new Function('name', 'console.log(name)');

const obj1 = {};
const obj2 = new Object();
const obj3 = new fun1();
const obj4 = new new Function();

console.log(typeof Object);//function
console.log(typeof Function);//function
console.log(typeof fun1);//function
console.log(typeof fun2);//function
console.log(typeof fun3);//function
console.log(typeof obj1);//object
console.log(typeof obj2);//object
console.log(typeof obj3);//object
console.log(typeof obj4);//object

console.log('Object', Object);//function
console.log('Function', Function);//function
console.log('fun1', fun1.prototype);//function
console.log('fun2', fun2);//function
console.log('fun3', fun3.prototype);//function
console.log(obj1);//object
console.log(obj2);//object
console.log(obj3.__proto__);//object
console.log(obj4);//object

// 所以可以看出，所有 Function 的实例都是函数对象，其他的均为普通对象，其中包括 Function 实例的实例。

// const prototype   //是函数所独有的
// const __proto__   //是对象所独有的
// const constructor //也是对象所独有的，它是一个对象指向一个函数，这个函数就是该对象的构造函数。
// const 构造函数 // 函数内部结构 就是构造函数

// Function Object 都是函数
// function.prototype(指向它的函数原型) function.prototype.__proto__(Object.prototype(对象的原型))  

//对象的__proto__指向它的父级函数的prototype
