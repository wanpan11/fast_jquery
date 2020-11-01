(function (window, undefined) {
    var njquery = function (selector) {
        return new njquery.prototype.init(selector);
    };
    njquery.prototype = {
        constructor: njquery,
        init: function (selector) {
            //0 消除首尾空格
            selector = njquery.trim(selector)
            //1接收 '' false undefined NaN null 0
            if (!selector) {
                return this;
            }
            //2接收字符串
            else if (njquery.isString(selector)) {
                //2.1接收代码片段
                if (njquery.isHTML(selector)) {
                    var temp = document.createElement('div');
                    temp.innerHTML = selector;
                    // for (var i = 0; i < temp.children.length; i++) {
                    //     this[i] = temp.children[i];
                    // }
                    // this.length = temp.children.length;
                    [].push.apply(this, temp.children)
                }
                //2.2接收选择器
                else {
                    var temp = document.querySelectorAll(selector);
                    // for (i = 0; i < temp.length; i++) {
                    //     this[i] = temp[i];
                    // };
                    // this.length = temp.length
                    [].push.apply(this, temp)
                };
            }
            //3接收数组
            else if (njquery.isArray(selector)) {
                /*
                                //3.1真数组
                                if (({}).toString.apply(selector) === '[object Array]') {
                                    [].push.apply(this, selector)
                                    console.log('真数组');
                                }
                                //3.2伪数字
                                else {
                                    var arr = [].slice.call(selector);
                                    [].push.apply(this, arr)
                                    console.log('伪数组');
                                }
                */

                //真伪数组 统一先转成真数组
                var arr = [].slice.call(selector);
                [].push.apply(this, arr)
            }
            //5接收方法
            else if (njquery.isFunction(selector)) {
                console.log('我是方法啊啊啊啊啊')
                njquery.isReday(selector)
            }
            return this;
        }
    };

    //静态方法
    njquery.extend = njquery.prototype.extend = function (obj) {
        for (var key in obj) {
            this[key] = obj[key]
        }
    }
    njquery.extend({
        trim: function (str) {
            if (typeof str === 'string') {
                if (str.trim()) {
                    return str.trim();
                } else {
                    str.replace(/^\s+|\s+$/g, '');
                };
            } else {
                return str;
            }
        },
        isString: function (str) {
            return typeof str === 'string'
        },
        isHTML: function (str) {
            return str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length > 3
        },
        isWindow: function (sele) {
            return sele != window
        },
        isObject: function (sele) {
            return typeof sele === 'object'
        },
        isArray: function (sele) {
            if (njquery.isObject(sele) && njquery.isWindow(sele) && length in sele) {
                return true;
            } else {
                return false
            }
        },
        isFunction: function (fn) {
            return typeof fn === 'function';
        },
        isReday: function (fn) {
            //这个监听事件性能更好
            document.addEventListener('DOMContentLoaded', fn);
            // window.onload = fn;
        }
    })

    njquery.prototype.init.prototype = njquery.prototype;
    window.njquery = window.$ = njquery;
})(window);