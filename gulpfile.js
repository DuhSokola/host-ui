var gulp = require('gulp'),
    debug = require('gulp-debug'),
    gulpif = require('gulp-if'),
    mergeStream = require('merge-stream');

/**
 * Build Distribution
 */
var useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('dist', function () {
    var assets = useref.assets();

    var i18n = gulp.src('src/resources/i18n/*.json')
        .pipe(gulp.dest('dist/resources/i18n/'));

    var uglymin = gulp.src(['src/**/*.html','!src/externals/**/*.html' ])
        .pipe(assets)
        .pipe(gulpif('*.js',ngAnnotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));

    return mergeStream(i18n, uglymin);
});


/**
 * Dependency Injection
 */
var inject = require('gulp-inject'),
    wiredep = require('wiredep');

gulp.task('injectBower', function () {
    wiredep({
        src: './src/index.html',
        directory: './src/externals/bower_components/',
        bowerJson: require('./bower.json')
    });
});
gulp.task('injectSources', function () {
    var target = gulp.src('./src/index.html');

    return target.pipe(inject(gulp.src(
        [
            'app/**/*.js',
            'app/**/*.css',
            'resources/style/**/*.css',
            '!externals/bower_components/**/*.js',
            '!externals/bower_components/**/*.css'
        ],
        {
            read: false,
            cwd: 'src'
        })
    ))
    .pipe(gulp.dest('./src'));
});


/**
 * Server with BrowserSync
 */
var browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        }
    });
    gulp.watch(['app/**/*.js','app/**/*.html', 'externals/**/*.js', 'externals/**/*.html','*.html'], {cwd: 'src'}, reload);
});

gulp.task('browserSync-dist', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
    gulp.watch(['css/*.css','js/*.js'], {cwd: 'dist'}, reload);
});

/**
 * Lint
 */
var htmlhint = require('gulp-htmlhint');
gulp.task('html',function(){
    return gulp.src(['src/**/*.html','!src/externals/**/*.html'])
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});

    
var csslint = require('gulp-csslint');
gulp.task('css', function() {
    return gulp.src(['src/**/*.css','!src/externals/**/*.css'])
        .pipe(csslint())
        .pipe(csslint.reporter());
});

var jshint = require('gulp-jshint');
gulp.task('js', function() {
    return gulp.src(['src/**/*.js','!src/externals/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * Tests
 */


/**
 * Combined Tasks
 */
gulp.task('inject',['injectBower','injectSources']);
gulp.task('serve',['inject', 'lint', 'browserSync']);
gulp.task('serve-dist',['inject','build','browserSync-dist']);
gulp.task('lint',['html','css','js']);
gulp.task('build',['lint', 'dist']);


