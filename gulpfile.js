var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('build', function () {
    return gulp.src('./src/*.js')
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function () {
    return gulp.src('./src/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});