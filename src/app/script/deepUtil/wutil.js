import {
    trim
} from "jquery";

const wutil = {};
export default wutil;

const deepClone = function (source) {
    const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
    for (let keys in source) { // 遍历目标
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else { // 如果不是，就直接赋值
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}
wutil.deepClone = deepClone


//校验
function isObject(obj) {
    return typeof obj === 'object' && obj != null;
}
wutil.isObject = isObject

const isEmali = function (n) {
    var reg = /\w{3,10}\@\w{2,6}\.com/;
    reg.test(n)
};
wutil.isEmali = isEmali

//获取时间方法
const getTimes = function () {
    var oDate = new Date;
    var sTime = zeroPadding(oDate.getHours()) + ':' + zeroPadding(oDate.getMinutes()) + ':' + zeroPadding(oDate.getSeconds()); //取补零后的参数
    console.log(typeof (sTime)); //字符串
    //补零操作
    function zeroPadding(n) {
        if (n <= 10) {
            return '0' + n;
        } else {
            return '' + n;
        };
    };
};
wutil.getTimes = getTimes

//请求
const Q = {
    xhr: new XMLHttpRequest(),
    get: (url, param) => {
        Q.xhr.withCredentials = true;
        const paramStr = Q.parseParam(param)
        Q.xhr.open('GET', encodeURI(url + '?' + paramStr), true);
        Q.xhr.send()
        return new Promise((rsv, rjc) => {
            Q.xhr.onreadystatechange = function () {
                if (Q.xhr.readyState == 4 && Q.xhr.status == 0) {
                    rsv(Q.xhr.responseText)
                } else {
                    rjc('请求失败')
                }
            }
        })
    },
    post: (url, param) => {
        Q.xhr.open('POST', url, true);
        Q.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Q.xhr.send(param);
    },
    parseParam: (param) => {
        let paramStr = '',
            No = Object.keys(param).length,
            paramArr = []

        for (let i in param) {
            let key = i;
            paramArr.push(key + '=' + param[i])
        }
        if (No <= 1) {
            paramStr = paramArr.toString()
            console.log(paramStr);
        } else {
            paramStr = paramArr.join('&')
        }
        return paramStr
    }
}
wutil.Q = Q