(function($, root) {
    function Control() {
        this.index = 0;
    };

    Control.prototype = {
        prev: function(len) {
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
