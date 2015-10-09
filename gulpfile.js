var gulp = require('gulp');
var debug = require('gulp-debug');

/*
 * Dependency Injection
 */
var inject = require('gulp-inject');
var wiredep = require('wiredep');

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

/*
 * Server with BrowserSync
 */

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        }
    });
    gulp.watch(['app/**/*.js','app/**/*.html', 'externals/**/*.js', 'externals/**/*.html','*.html'], {cwd: 'src'}, reload);
});

/*
 * Combined Tasks
 */
gulp.task('inject',['injectBower','injectSources']);
gulp.task('serve',['inject','browserSync']);


