$().ready(function () {
    //读取数据
    $.ajax({
        type: 'get',
        url: 'weibo-2.php',
        data: 'name=wanpna',
        success: function (msg) {
            if (msg == ']') {
                return;
            }
            var json = JSON.parse(msg);
            for (let i in json) {
                var lis = '<li class="item">' +
                    '<span class="tempText" style="float:left;">' + json[i].speakText + '</span>' +
                    '<span class="tempDelete" style="float:right">删除</span>' +
                    '<span class="tempTime" style="float:right">' + json[i].speackTime + '</span>' +
                    '<div class="clearfix"></div>' +
                    '</li>';
                $('#listBox').prepend(lis);
            }
        },
        error: function (msg) {
            console.log(msg.status);
        }
    });

    //设置时间
    function setTime(date, time) {
        for (let i in date) {
            if (date[i] < 10) {
                date[i] = '0' + date[i];
            };
        };
        for (let i in time) {
            if (time[i] < 10) {
                time[i] = '0' + time[i];
            };
        };
        return date.join('.') + ' ' + time.join('.')
    }

    //发言
    $('#toSpeak').on('click', function () {
        var $SpeakText = $('#textContent').val();
        if ($SpeakText != '') {
            var oDate = new Date();
            var sTimeStamp = oDate.getTime();
            var sSpeackTime = setTime([oDate.getFullYear(), oDate.getMonth(), oDate.getDay()], [oDate.getHours(), oDate.getMinutes(), oDate.getSeconds()]);
            $.ajax({
                type: 'get',
                url: 'weibo-1.php',
                data: {
                    'speakText': $SpeakText,
                    'speackTime': sSpeackTime,
                    'timeStamp': sTimeStamp
                },
                success: function (msg) {
                    var json = JSON.parse(msg);
                    var lis = '<li class="item">' +
                        '<span class="tempText" style="float:left;">' + json.speakText + '</span>' +
                        '<span class="tempDelete" style="float:right">删除</span>' +
                        '<span class="tempTime" style="float:right">' + json.speackTime + '</span>' +
                        '<div class="clearfix"></div>' +
                        '</li>';
                    $('#listBox').prepend(lis);
                    $('#textContent').val('');
                    $('#toSpeak').css('opacity', '70%');
                },
                error: function (msg) {
                    console.log(msg.status)
                }
            })
        } else {
            alert('请输入你要留言的内容哦。');
        }
    });
    //input输入事件
    $('#textContent').keyup(function () {
        $('#toSpeak').css('opacity', '100%');
    })
});
