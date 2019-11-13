const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const server = function (cb){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    cb();
}
const css = function () {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

const watch = function(){
    gulp.watch("./scss/**/*.scss", gulp.series(css));
    gulp.watch("./*.html").on('change', browserSync.reload);
}

exports.css = css;
exports.watch = watch;

exports.default = gulp.series(css, server, watch);
