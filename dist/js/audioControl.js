(function($, root) {
    function AudioManage() {
        this.audio = new Audio();
        this.status = 'pause'; //默认没有播放
    }

    AudioManage.prototype = {
        play: function() {
            this.audio.play();
            this.status = 'play';
        },

        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },

        getMusic: function(src) {
            console.log(src);
            this.audio.src = src;
            this.audio.load();
        },

        playTo: function(time) {
            //播放会跳到当前的位置
            this.audio.currentTime = time;
        }
    }
    //构造函数有原型，放在原型链 prototype上
    root.audioManager = new AudioManage();  //接口暴露出来

})(window.Zepto, window.player || (window.player = {}));
