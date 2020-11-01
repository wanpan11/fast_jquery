/* 数组操作 去重 排序 */
/* const array = ['2', 'b', '9', 'a', '7', '3', '4', 'b', '6', '4'];

function handle(arr) {
    // play1
    let newArr = [];
    for (let i in arr) {
        let No = newArr.indexOf(arr[i])
        if (No === -1) {
            newArr.push(arr[i])
        }
    }
    console.log('play1', newArr.sort());
    // play2
    let NumberArr = []
    let stringArr = []
    for (let i in arr) {
        let str = stringArr.indexOf(arr[i])
        let No = NumberArr.indexOf(arr[i])
        if (str === -1 && No === -1) {
            isNaN(arr[i]) ? stringArr.push(arr[i]) : NumberArr.push(arr[i])
        }
    }
    NumberArr.sort()
    stringArr.sort()
    for (let i in stringArr) {
        NumberArr.push(stringArr[i])
    }
    console.log('play2', NumberArr);
}
handle(array); // output: ['2', '3', '4', '6', '7', '9', 'a', 'b'] */

function memoizeFunction(func) {
    var cache = {};
    return function () {
        var key = arguments[0];
        if (cache[key]) {
            return cache[key];
        } else {
            var val = func.apply(this, arguments);
            cache[key] = val;
            return val;
        }
    };
}

var fibonacci = memoizeFunction(function (n) {
    return n === 0 || n === 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(100)); // 输出354224848179262000000
console.log(fibonacci(100)); // 输出354224848179262000000

console.log(1 > 2 ? '是的' : '错的');

function wanpan(name) {
    console.log(arguments, name);
}

wanpan(21, 33, 44, 55)


// 递归
// 发起一个请求，返回的数据过大。分多次执行操作
let param = {}
$.ajax('example', param)