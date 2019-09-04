//实现页面渲染，img + 歌曲信息 + like-btn

(function($, root) {
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function() {
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
        };
    };

    function renderInfo(info) {
        var songInfoStr = '<div class="song-name">'+info.song+'</div>\
        <div class="singer-name">'+info.singer+'</div>\
        <div class="album-name">'+info.album+'</div>';
        $('.song-info').html(songInfoStr);

        // $('.song-name').text(info.song);
        // $('.singer-name').text(info.singer);
        // $('.album-name').text(info.album);
    };

    function renderLike(like) {
        if(like.isLike == true) {
            $('.btn.like').addClass('liked');
        }else {
            $('.btn.like').removeClass('liked');
        }
    };

    root.render = function(data) {
        renderImg(data.image);
        renderInfo(data);
        renderLike(data);
    };


})(window.Zepto, window.player || (window.player = {}));
