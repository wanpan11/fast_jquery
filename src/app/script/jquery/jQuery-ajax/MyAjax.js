//处理中文兼容和IE缓存问题 传递参数
function setUrl(date) {
    // var date = new Date();
    // url = url + '?t=' + date.getTime();
    date.t = new Date().getTime();
    var params = [];
    for (var key in date) {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(date[key]));
    };
    return params.join('&');
};
//封装ajax
function ajax(obj) {
    if (obj.method.toLowerCase() === 'get') {
        //1.创建异步对象
        var xmlhttp = new XMLHttpRequest;
        //2.创建请求
        xmlhttp.open(obj.method, obj.url + '?' + setUrl(obj.data), true)
        //3.发送请求
        xmlhttp.send()
    }
    //post请求
    else {
        //1.创建异步对象
        var xmlhttp = new XMLHttpRequest;
        //2.创建请求
        xmlhttp.open(obj.method, obj.url, true)
        //3.发送post请求头
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        //4.发送请求
        xmlhttp.send(setUrl(obj.data))
    };
    //4.请求结果
    xmlhttp.onreadystatechange = function () {
        clearInterval(timer);
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
                obj.success(xmlhttp)
            } else {
                obj.error()
            };
        };
    };
    //请求超时 中断请求
    var timer;
    if (obj.timeout) {
        timer = setInterval(function () {
            //abort() 中断请求
            xmlhttp.abort();
            alert('请求超时');
            clearInterval(timer);
        }, obj.timeout);
    };
};