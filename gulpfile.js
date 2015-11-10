var gulp = require('gulp'),
    debug = require('gulp-debug'),
    gulpif = require('gulp-if'),
    mergeStream = require('merge-stream');

/**
 * Combined Tasks
 */
gulp.task('serve',['inject', 'lint', 'browserSync']);
gulp.task('lint',['html','css','js']);
gulp.task('test',['unit']);
gulp.task('inject',['injectBower','injectSources']);

gulp.task('serve-dev',['injectDev', 'lintDev', 'browserSync-dev']);
gulp.task('lintDev',['html','css','js-dev']);
gulp.task('injectDev',['injectBower-dev','injectSources-dev']);

gulp.task('build',['lint','unit', 'dist']);
gulp.task('serve-build',['inject','build','browserSync-dist']);


/**
 * Tests
 */
var jasmine = require('gulp-jasmine'),
    reporters = require('jasmine-reporters');

gulp.task('unit', function () {
    return gulp.src('test/unit/*.unit.js')
        .pipe(jasmine({
            reporter: new reporters.JUnitXmlReporter()
        }));
});


/**
 * Build Distribution
 */
var useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('dist', function () {
    var assets = useref.assets();

    var i18n = gulp.src('src/assets/i18n/*.json')
        .pipe(gulp.dest('dist/assets/i18n/'));

    var uglymin = gulp.src(['src/**/*.html','!src/externals/**/*.html','!app/app.module-mock.js'])
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
        bowerJson: require('./bower.json'),
        devDependencies: false
    });
});
gulp.task('injectSources', function () {
    var target = gulp.src('./src/index.html');

    return target.pipe(inject(gulp.src(
        [
            'app/**/*.js',
            '!app/app.module-mock.js',
            'app/**/*.css',
            'assets/style/**/*.css',
            '!externals/bower_components/**/*.css',
            '!externals/bower_components/**/*.js'
        ],
        {
            read: false,
            cwd: 'src'
        })
    )).pipe(gulp.dest('./src'));
});

gulp.task('injectBower-dev', function () {
    wiredep({
        src: './src/index.html',
        directory: './src/externals/bower_components/',
        bowerJson: require('./bower.json'),
        devDependencies: true
    });
});
gulp.task('injectSources-dev', function () {
    var target = gulp.src('./src/index.html');

    return target.pipe(inject(gulp.src(
            [
                'app/**/*.js',
                '!app/app.module.js',
                'app/**/*.css',
                'assets/style/**/*.css',
                '!externals/bower_components/**/*.js',
                '!externals/bower_components/**/*.css'
            ],
            {
                read: false,
                cwd: 'src'
            })
    )).pipe(gulp.dest('./src'));
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
    gulp.watch(['app/**/*.js','!app/app.module-mock.js','app/**/*.html', 'externals/**/*.js', 'externals/**/*.html','*.html', 'assets/i18n/*.json'], {cwd: 'src'}, reload);
});
gulp.task('browserSync-dev', function() {
    browserSync({
        server: {
            baseDir: 'src',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    });
    gulp.watch(['app/**/*.js','!app/app.module.js','app/**/*.html', 'externals/**/*.js', 'externals/**/*.html','*.html'], {cwd: 'src'}, reload);
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
        .pipe(htmlhint('.htmlhintrc'))
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
    return gulp.src(['src/**/*.js','!src/externals/**/*.js','!src/app/app.module-mock.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('js-dev', function() {
    return gulp.src(['src/**/*.js','!src/externals/**/*.js','!src/app/app.module.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

