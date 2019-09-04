//1. 信息，图片渲染到页面上， 2.按钮的点击， 3. 音频的播放暂停和切歌
//4.进度条运动与拖拽， 5. 图片旋转， 6. 列表展示切歌

var root = window.player;
var dataList = [];
var dataLen = 0;
var audio = root.audioManager;
var indexControl = null;
var timer = null;

function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data) {
            console.log(data);
            dataList = data;
            dataLen = data.length;
            indexControl = new root.controlIndex(dataLen);
            //取到数据的第一条
            root.render(data[0]);
            audio.getMusic(data[0].audio);
            root.pro.renderSongTime(data[0].duration);

            bindEvents();
            barTouch();
        },
        error: function() {
            console.log('error');
        },
    });
};

function bindEvents() {
    $('.prev').on('click', function() {
        var curIndex = indexControl.prev(dataLen);
        musicPlay(curIndex);
        root.pro.startMove(0);
        if(audio.status == 'pause') {
            audio.pause();
            root.pro.stopMove();
        }else {
            audio.play();
            root.pro.startMove();
        }
    });

    $('.next').on('click', function() {
        var curIndex = indexControl.next(dataLen);
        musicPlay(curIndex);
        root.pro.startMove(0);
        if(audio.status == 'pause') {
            audio.pause();
            root.pro.stopMove();
        }else {
            audio.play();
            root.pro.startMove();
        }
    });

    $('.play').on('click', function() {
        if(audio.status == 'pause') {
            audio.play();
            root.pro.startMove();
            var imgDeg = $('.img-box').attr('deg-data');
            imgRotate(imgDeg);

        }else{
            audio.pause();
            clearInterval(timer);
            root.pro.stopMove();

        }
        //这种方法直接代替add&removeClass
        $(this).toggleClass('playing');
    });

};

function musicPlay(index) {
    audio.getMusic(dataList[index].audio);
    root.render(dataList[index]);
    root.pro.renderSongTime(dataList[index].duration);

    //如果当前音频是播放状态，那么切换歌曲后还是播放状态
    if(audio.status == 'play') {
        imgRotate(0);
        audio.play();
    }
    $('.img-box').attr('deg-data', 0);
    $('.img-box').css({
        'transform': 'rotateZ('+ 0 +'deg)',
        'transition': 'none',
    });
};

function imgRotate(deg) {
    deg = +deg //字符串转换成数字
    clearInterval(timer);
    timer = setInterval(function() {
        deg += 2.5;
        $('.img-box').attr('deg-data', deg);
        $('.img-box').css({
            'transform': 'rotateZ('+ deg +'deg)',
            'transition': 'transform 0.5s linear'
        });
    }, 500);
};

//拖拽事件
function barTouch() {
    var offset = $('.duration').offset();
    $('.dot').on('touchstart', function() {
        root.pro.stopMove();
    }).on('touchmove', function(e) {
        var position = e.changedTouches[0].clientX;
        var per = (position - offset.left) / offset.width;
        if(per > 0 && per < 1) {
            root.pro.update(per);
        }
    }).on('touchend', function(e) {
        //歌曲要在拖到的位置播放
        var position = e.changedTouches[0].clientX;
        var per = (position - offset.left) / offset.width;
        if(per > 0 && per < 1) {
            var duration = dataList[indexControl.index].duration;
            var curTime = per * duration;
            audio.playTo(curTime);
            $('.play').addClass('playing');
            audio.play();
            audio.status = 'playing';
            root.pro.startMove(per);
        }
    });
}

getData('../mock/data.json');
