import '../style/musicPlay.css';
import './musicPlay/progress.js';
import './musicPlay/Play.js';

const data = require('../../public/data/musicInfo.json');
const music4 = require('../../public/music/二区六楼 - 半山.mp3');
const music3 = require('../../public/music/段涵 - 晨曦的光.mp3');
const music2 = require('../../public/music/红白色乐队 - 镜像.mp3');
const music1 = require('../../public/music/马也_Crabbit - 冬眠（男版）（翻自 司南）.mp3');
const musicArr = [music1.default, music2.default, music3.default, music4.default]

$(function () {
    var $audio = $('audio');
    var $progressBox = $('.progressBox');
    var $progressBg = $('.progressBg');
    var $progress = $('.progress');
    var $point = $('.progressPoint');
    var playStart = new Player($audio);
    var progressEvent = new ProgressEvent($progressBg, $progress, $point, $progressBox);

    $.each(data, (index, obj) => {
        obj.url = musicArr[index]
        createList(index, obj)
    })

    console.log(data);

    // 获取json数据
    /* function musicSource() {
        $.ajax({
            url: '../public/music/musicInfo.json',
            dataType: 'json',
            success: function (data) {
                playStart.musicList = data;
                console.log('success');
                $.each(data, function (index, music) {
                    createList(index, music)
                });
            },
            error: function (err) {
                console.log(err);
                console.log('error');
            }
        });
    };
    musicSource() */

    //拿到数据后创建列表
    function createList(index, music) {
        var $musicList = $(
            '<li class="listItem" data-index="' + index + '" data-url="' + music.url + '">' +
            '<span>' + music.musicName + '</span >' +
            '<span>' + music.singer + '</span >' +
            '<span>' + music.time + '</span >' +
            '<div class="controlBox">' +
            '<div class="musicStart"></div >' +
            '<div class="clearfix"></div >' +
            '</div>' +
            '</li >'
        );
        $('ul').append($musicList);
    }

    //初始化事件监听
    initEvents();
    function initEvents() {
        //list控制播放
        $('ul').on('click', '.musicStart,.musicStop', function () {
            let $itme = $(this).parents('li')
            const index = $itme.data('index')
            const url = $itme.data('url')

            var musicStart = $(this).attr('class');
            if (musicStart !== 'musicStop') {
                $(this).parent().parent().siblings().find('.musicStart,.musicStop').removeClass('musicStop').addClass('musicStart')
                $(this).parent().parent().siblings().css({ 'background': '#ffffff', 'color': '#222' })
                $(this).removeClass('musicStart').addClass('musicStop')
                $(this).parent().parent().css({ 'background': '#7249F2', 'color': '#fff' })
                $('.bottomPlay,.bottomStop').removeClass('bottomPlay').addClass('bottomStop')
            }
            else if (musicStart == 'musicStop') {
                $(this).removeClass('musicStop').addClass('musicStart')
                $(this).parent().parent().css({ 'background': '#fff', 'color': '#222' })
                $('.bottomPlay,.bottomStop').removeClass('bottomStop').addClass('bottomPlay')
            }
            playStart.playMusic(index, url);
        });
        //bottom控制播放
        $('.bottomStop,.bottomPlay').click(function () {
            var $itme = $('.musicList li');
            var musicStart2 = $(this).attr('class');
            if (playStart.currentIndex == -1) {
                playStart.playMusic($itme.eq(0).data('index'), $itme.eq(0).data('url'));
                $('.musicStart').eq(0).removeClass('musicStart').addClass('musicStop')
                $('.musicStop,.musicStart').eq(0).parent().parent().css({ 'background': '#7249F2', 'color': '#fff' })
                $(this).removeClass('bottomPlay').addClass('bottomStop')
            } else if (musicStart2 == 'bottomStop') {
                playStart.playMusic($itme.eq(playStart.currentIndex).data('index'), $itme.eq(playStart.currentIndex).data('url'));
                $('.musicStop,.musicStart').removeClass('musicStop').addClass('musicStart')
                $('.musicStop,.musicStart').parent().parent().css({ 'background': '#fff', 'color': '#222' });
                $(this).removeClass('bottomStop').addClass('bottomPlay');
            } else {
                playStart.playMusic($itme.eq(playStart.currentIndex).data('index'), $itme.eq(playStart.currentIndex).data('url'));
                $('.musicStart').eq(playStart.currentIndex).removeClass('musicStart').addClass('musicStop')
                $('.musicStop,.musicStart').eq(playStart.currentIndex).parent().parent().css({ 'background': '#7249F2', 'color': '#fff' })
                $(this).removeClass('bottomPlay').addClass('bottomStop');
            }
        });
        //进度条点击事件
        progressEvent.progressClick();
        // 进度点拖拽事件
        progressEvent.progressMove();
        //自动循环播放
        function musicStyle(currentIndex) {
            var $listNo = $('.musicList').children().length
            var beforMusic = currentIndex - 1;
            var currentMusic = currentIndex;
            var $itme = $('.musicList li').eq(beforMusic);
            var $itme1 = $('.musicList li').eq(currentMusic);
            if ($listNo - 1 >= currentIndex) {
                $itme.css({ 'background': '#fff', 'color': '#222' }).find('.musicStop').removeClass('musicStop').addClass('musicStart');
                $itme1.css({ 'background': '#7249F2', 'color': '#fff' }).find('.musicStart').removeClass('musicStart').addClass('musicStop');
            } else {
                playStart.currentIndex = 0;
                $('.musicStop').removeClass('musicStop').addClass('musicStart').parent().parent().css({ 'background': '#fff', 'color': '#222' });
                $('.musicStart').eq(playStart.currentIndex).removeClass('musicStart').addClass('musicStop').parent().parent().css({ 'background': '#7249F2', 'color': '#fff' });
            }
        }
        //音乐播放事件
        playStart.musicUpdate(function () {
            var $itme = $('.musicList li');
            $('.timeLength').text(playStart.timeStr);
            var progress = playStart.currentTime / playStart.durationTime * 100 + '%';
            if (progressEvent.proportion != -1 && progressEvent.proportion != 1) {
                playStart.audio.currentTime = playStart.durationTime * progressEvent.proportion;
                progressEvent.proportion = -1;
            } else if (progressEvent.proportion == 1) {
                //放开鼠标之前继续播放
            } else {
                $point.css('left', 'calc(' + progress + ' - 3px)');
                $progress.css('width', progress);
            };
            if (playStart.currentTime == playStart.durationTime) {
                debugger
                playStart.currentIndex = playStart.currentIndex + 1;
                musicStyle(playStart.currentIndex)
                playStart.playMusic($itme.eq(playStart.currentIndex).data('index'), $itme.eq(playStart.currentIndex).data('url'));
            }
        });
    };
});