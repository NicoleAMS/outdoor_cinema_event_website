const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// compile scss into css
function style() {
    // find scss file (custom file necessary to include changes made here during every browser reload)
    return gulp.src(['./src/sass/*.scss', './src/sass/custom/*.scss'])
    // pass file through scss compiler
    .pipe(sass().on('error', sass.logError))
    // save compiled css
    .pipe(gulp.dest('./src/public/css/'))
    // stream changes to all browsers
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });

    gulp.watch(['./src/sass/*.scss', './src/sass/custom/*.scss'], style);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;