//封装ajax
function ajax(method, url, boolean) {
    //1.创建异步对象
    var xmlhttp = new XMLHttpRequest;
    //2.创建请求
    xmlhttp.open(method, url, boolean)
    //3.发送请求
    xmlhttp.send()
    //2.请求结果
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
                console.log('success');
            } else {
                console.log('error')
            }
        }
    }
}