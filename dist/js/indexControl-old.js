(function($, root) {
    function Control() {
        this.index = 0;
    };

    Control.prototype = {
        prev: function(len) {
            //如果当前是第一张，那么点击上一首就是总长度减1，为2，也就是最后一首
            // if(this.index == 0) {
            //     this.index = len - 1;
            // }
            // else {
            //     //否则现在的索引减少一位
            //     this.index --;
            // };
            // return this.index;

            this.index == 0 ? this.index = len - 1 : this.index --;
            return this.index;
        },

        next: function(len) {
            //如果当前index是2（最后一首），那么点击跳转到第一首
            if(this.index == len - 1) {
                this.index = 0;
            }
            else {
                //否则现在的索引减少一位
                this.index ++;
            };
            return this.index;
        },
    }
    root.controlIndex = new Control();

})(window.Zepto, window.player || (window.player = {}));
