const gulp = require('gulp');

// gulp.task('hello', function(w) {
//     console.log('hello world');
//     w()
// })

const less = require('gulp-less');
const authoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const ftp = require('vinyl-ftp');

import 'getconn.js';



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
// var config = {
//     path: {
//         less: 'info_card/src/less/*.less',
//         html: 'info_card/public/index.html',

//     },
//     output: {
//         cssName: 'bundle.min.css',
//         path: 'info_card/public',
//         path_file: 'info_card/public/index.html',
//         path_file_css: 'info_card/public/bundle.min.css',
//         newHtml: '/tmp/fz3temp-2'
//     }
// }

// лендинг 2
// var config = {
//     path: {
//         less: 'land2/src/less/*.less',
//         html: 'land2/public/l2-index.html',

//     },
//     output: {
//         cssName: 'l2-bundle.min.css',
//         path: 'land2/public',
//         path_file: 'land2/public/l2-index.html',
//         path_file_css: 'land2/public/l2-bundle.min.css',
//         newHtml: '/tmp/fz3temp-2'
//     }
// }

// лендинг 3
var config = {
    path: {
        less: 'land3/src/less/*.less',
        html: 'land3/public/l3-index.html',

    },
    output: {
        cssName: 'l3-bundle.min.css',
        path: 'land3/public',
        path_file: 'land3/public/l3-index.html',
        path_file_css: 'land3/public/l3-bundle.min.css',
        newHtml: '/tmp/fz3temp-2'
    }
}


// var config = {
//     path: {
//         less: 'bs/src/less/*.less',
//         html: 'bs/public/index.html',

//     },
//     output: {
//         cssName: 'bundle.min.css',
//         path: 'bs/public',
//         path_file: 'bs/public/index.html',
//         path_file_css: 'land2/public/bundle.min.css',
//         newHtml: '/tmp/fz3temp-2'
//     }
// }

gulp.task('less', function () {
    return gulp.src(config.path.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(authoprefixer())
        // .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('push', function () {
    return gulp.src(config.output.path_file).pipe(gulp.dest(config.output.newHtml));
});

gulp.task('pushCss', function () {
    return gulp.src(config.output.path_file_css).pipe(gulp.dest(config.output.newHtml));
})

gulp.task('serve', (done) => {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });
    gulp.watch(config.path.less, gulp.series('less')); //, 'push', 'pushCss'));
    gulp.watch(config.path.html).on('change', () => {
        browserSync.reload();
        done();
    });

});


const globs = [
    './app/index.html',

];

// Отправляем                                                                
gulp.task('deploy', function () {

    console.log("ftp task is running!");


    const conn = getConn()


    return

    gulp.src(globs, { base: '.', buffer: false })

        .pipe(conn.dest(''));

});

gulp.task('default', gulp.series('less', 'serve'));

