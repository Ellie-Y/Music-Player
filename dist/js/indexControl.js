(function($, root) {
    function Control(len) {
        this.index = 0;
        this.len = len;
    };

    Control.prototype = {
        prev: function(len) {
            return this.getIndex(-1);
        },

        next: function(len) {
            return this.getIndex(1);
        },

        getIndex: function(value) {
            //当前对应索引
            var index = this.index;
            var len = this.len;
            var curIndex = (index + value + len) % len; //index 算法
            this.index = curIndex; //index 更新成改变后的索引

            //改变后的 index
            return curIndex;
        }
    }
    //把整个构造函数暴露出去，而不是对象
    root.controlIndex = Control;

})(window.Zepto, window.player || (window.player = {}));
