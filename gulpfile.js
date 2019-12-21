var gulp = require('gulp');

// gulp.task('hello', function(w) {
//     console.log('hello world');
//     w()
// })

var less = require('gulp-less');
var authoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

// var config = {
//     path: {
//         less: './src/less/*.less',
//         html: '.public/index.html',

//     },
//     output: {
//         cssName: 'bundle.min.css',
//         path: './public',
//         path_file: './public/index.html',
//         path_file_css: './public/bundle.min.css',
//         newHtml: '/tmp/fz3temp-2'
//     }
// }

// info card
var config = {
    path: {
        less: 'info_card/src/less/*.less',
        html: 'info_card/public/index.html',

    },
    output: {
        cssName: 'bundle.min.css',
        path: 'info_card/public',
        path_file: 'info_card/public/index.html',
        path_file_css: 'info_card/public/bundle.min.css',
        newHtml: '/tmp/fz3temp-2'
    }
}




gulp.task('less', function() {
    return gulp.src(config.path.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(authoprefixer())
        //.pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('push', function() {
    return gulp.src(config.output.path_file).pipe(gulp.dest(config.output.newHtml));
});

gulp.task('pushCss', function() {
    return gulp.src(config.output.path_file_css).pipe(gulp.dest(config.output.newHtml));
})

gulp.task('serve', (done) => {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });
    gulp.watch(config.path.less, gulp.series('less'));
    //  'push', 'pushCss'));
    gulp.watch(config.path.html).on('change', () => {
        browserSync.reload();
        done();
    });

});

gulp.task('default', gulp.series('less', 'serve'));