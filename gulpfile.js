var gulp = require('gulp'),
    htmLClean = require('gulp-htmlclean'),
    imageMin = require('gulp-imagemin');

//将 less转换成 css
var less = require('gulp-less');
var postCss = require('gulp-postcss');

//添加前缀
var autoprefixer = require('autoprefixer');

//开启本地服务器
var connect = require('gulp-connect');


var folder = {
    //src 是开发目录，dist 是打包后目录
    src: 'src/',
    dist: 'dist/'
};

var devMode = process.env.NODE_ENV == 'development';

/*
 先把文件取出来，然后把文件流放到管道里去处理，处理的时候经过了html的压缩处理。
 最后把压缩完成的文件输出到规定的目录去
 */
gulp.task('html', function() {
    //  src 目录下所有的 html 文件， * 是所有的意思。生产环境下才压缩 html文件
        page = gulp.src(folder.src + 'html/*')
            .pipe(connect.reload());
            if(!devMode) {
                page.pipe(htmLClean());
            }
        //没有 html文件会自动生成, dest 是把文件写入到某地
            page.pipe(gulp.dest(folder.dist + 'html/'));
});

//压缩图片
gulp.task('image', function() {
    gulp.src(folder.src + 'image/*')
        // .pipe(imageMin()) 报错
        .pipe(connect.reload())
        //没有 html文件会自动生成, dest 是把文件写入到某地
        .pipe(gulp.dest(folder.dist + 'images/'));
});

gulp.task('css', function() {
    gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        .pipe(gulp.dest(folder.dist + 'css/'));
});

gulp.task('js', function() {
    gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
        .pipe(gulp.dest(folder.dist + 'js/'));
});

//连接本地服务器
gulp.task('server', function() {
    connect.server({
        //更改端口号，避免冲突
        port: '5500',
        //自动刷新属性
        livereload: true
    });
});

//开启监听
gulp.task('watch', function() {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);

})

gulp.task('default', ['html', 'css', 'js', 'image', 'server', 'watch']);
