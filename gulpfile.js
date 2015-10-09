var gulp = require('gulp');


/*
 * Dependency Injection
 */
var inject = require('gulp-inject');
var wiredep = require('wiredep');

gulp.task('bower', function () {
    wiredep({
        src: './src/index.html',
        directory: './src/externals/bower_components/',
        bowerJson: require('./bower.json'),
    });
});

gulp.task('inject', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./src/**/*.js', './src/**/*.css','!./src/externals/bower_components/**/*.js','!./src/externals/bower_components/**/*.css'], {read: false});
    return target.pipe(inject(sources))
        .pipe(gulp.dest('./src'));
});

/*
 * Server with BrowserSync
 */

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', function() {
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
gulp.task('injectDeps',['bower','inject']);


