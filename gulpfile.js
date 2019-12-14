var gulp = require('gulp');

// gulp.task('hello', function(w) {
//     console.log('hello world');
//     w()
// })

var less = require('gulp-less');
var authoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleanCss = require('clean-css');
var browserSync = require('browser-sync').create();

var config = {
    path: {
        less: './src/less/**/*.less',
        html: '.public/index.html'
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public'
    }
}

gulp.task('less', function() {
    return gulp.src(config.path.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(authoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });
    gulp.watch(config.paths.less, ['less']);
    gulp.watch(config.paths.html).on('change', browerSync.reload);

});

gulp.task('default', ['less', 'serve']);