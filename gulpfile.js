const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// compile scss into css
function style() {
    // find scss file
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', './src/sass/*.scss', './src/sass/custom/*.scss'])
    // pass file through scss compiler
    .pipe(sass().on('error', sass.logError))
    // save compiled css
    .pipe(gulp.dest('./src/public/css/'))
    // stream changes to all browsers
    .pipe(browserSync.stream());
}

function javascript() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'])
    .pipe(gulp.dest('./src/js'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', './src/sass/*.scss', './src/sass/custom/*.scss'], style);
    gulp.watch('./src/*.html').on('change', browserSync.reload);
    gulp.watch(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'], javascript);
}

exports.style = style;
exports.javascript = javascript;
exports.watch = watch;