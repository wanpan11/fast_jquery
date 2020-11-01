(function (window) {
    function ProgressEvent(progressBg, progress, point, progressBox) {
        ProgressEvent.prototype.init(progressBg, progress, point, progressBox)
    };
    ProgressEvent.prototype = {
        constructor: ProgressEvent,
        proportion: -1,
        init: function (progressBg, progress, point, progressBox) {
            this.progressBg = progressBg;
            this.progressBox = progressBox;
            this.progress = progress;
            this.point = point;
        },
        progressClick: function () {
            var $this = this;
            this.progressBox.mousedown(function (event) {
                var boxX = $(this).offset().left;
                var clientX = event.clientX;
                var progressX = clientX - boxX;
                //进度点位置
                $this.point.css('left', (progressX - 3) + 'px');
                //设置进度条宽度
                $this.progress.css('width', progressX + 'px');
                //计算点击位置的音乐播放进度
                $this.proportion = parseInt($this.progress.css('width')) / parseInt($this.progressBg.css('width'));
            });
        },
        progressMove: function () {
            var $this = this;
            this.point.mousedown(function () {
                $(document).mousemove(function (event) {
                    var boxX = $this.progressBox.offset().left;
                    var clientX = event.clientX;
                    var progressX = clientX - boxX;
                    if (parseInt($this.point.css('left')) < parseInt($this.progressBg.css('width'))) {
                        //进度点位置
                        $this.point.css('left', (progressX - 3) + 'px');
                        //设置进度条宽度
                        $this.progress.css('width', progressX + 'px');
                        $this.proportion = 1;
                    }
                });
                $(document).mouseup(function () {
                    $(document).off('mousemove');
                    //避免每次鼠标松开都触发进度比例
                    if ($this.proportion == 1) {
                        //计算点击位置的音乐播放进度
                        $this.proportion = parseInt($this.progress.css('width')) / parseInt($this.progressBg.css('width'));
                    }
                });
            });
        }
    };
    window.ProgressEvent = ProgressEvent;
})(window);