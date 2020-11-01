
(function (window) {
    function Player($audio) {
        Player.prototype.init($audio);
    };
    Player.prototype = {
        constructor: Player,
        currentIndex: -1,
        init: function ($audio) {
            musicList: [];
            this.$audio = $audio;
            this.audio = $audio.get(0);
        },
        //播放方法
        playMusic: function (index, url) {
            if (this.currentIndex == index) {
                if (this.audio.paused) {
                    this.audio.play();
                    if (this.currentTime != undefined && this.currentTime != this.durationTime) {
                        this.audio.currentTime = this.currentTime;
                    } else {
                        this.$audio.attr('src', url);
                        this.audio.play()
                        this.currentIndex = index;
                    }
                } else {
                    this.audio.pause()
                }
            } else {
                this.$audio.attr('src', url);
                this.audio.play()
                this.currentIndex = index;
            };

        },
        //音乐播放事件
        musicUpdate: function (callBack) {
            //保留player的this
            var $this = this
            this.$audio.on('timeupdate', function () {
                $this.durationTime = $this.audio.duration;;
                $this.currentTime = $this.audio.currentTime;
                $this.timeStr = $this.formatDate($this.durationTime, $this.currentTime);
                callBack($this.durationTime, $this.currentTime, $this.timeStr)
            });
        },
        formatDate: function (durationTime, currentTime) {
            var endMin = parseInt(currentTime / 60);
            var endSecond = parseInt(currentTime % 60);
            var startMin = parseInt(durationTime / 60);
            var startSecond = parseInt(durationTime % 60);
            if (endMin < 10) {
                endMin = '0' + endMin;
            };
            if (endSecond < 10) {
                endSecond = '0' + endSecond;
            };
            if (startMin < 10) {
                startMin = '0' + startMin;
            };
            if (startSecond < 10) {
                startSecond = '0' + startSecond;
            };
            return endMin + ':' + endSecond + '/' + startMin + ':' + startSecond
        }
    }
    // player.prototype.init.prototype = player.prototype;
    window.Player = Player;
})(window);