//进度条 -> 渲染总时间，播放音乐进度条运动，左侧更新时间，进度条拖拽交互

(function($, root) {
    var frameId,
        dur,
        startTime;

    var lastPer = 0;

    function renderSongTime(dataTime) {
        dur = dataTime;
        dataTime = formateTime(dataTime);
        $('.whole-time').html(dataTime);
    };

    function formateTime(time) {
        time = Math.round(time);
        var min = Math.floor(time / 60);
        var sec = time - min * 60;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        return min +':'+ sec;
    };

    function startMove(time) {
        lastPer = time == undefined ? lastPer : time;
        startTime = new Date().getTime();
        function frame() {
            var nowTime = new Date().getTime();
            var percent = lastPer + (nowTime - startTime) / (dur * 1000);
            if (percent < 1) {
                update(percent);
            }else {
                cancelAnimationFrame(frameId);
            };
            //延迟调用
            frameId = requestAnimationFrame(frame);
        };

        frame();
    };

    //根据穿过来的百分比来渲染左侧时间和进度条位置
    function update(per) {
        var time = formateTime(per * dur);
        $('.cur-time').html(time);
        var perX = (per - 1) * 100 + '%';
        $('.duration .top').css({
            'transform':'translateX('+ perX +')'
        })
    }

    function stopMove() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        //累加只是上次的累加，所以还要把上次的值也一起放进去
        lastPer = lastPer + (stopTime - startTime) / (dur * 1000);
    }

    root.pro = {
        renderSongTime: renderSongTime,
        startMove: startMove,
        stopMove: stopMove,
        update: update
    }

})(window.Zepto, window.player || (window.player = {}));
