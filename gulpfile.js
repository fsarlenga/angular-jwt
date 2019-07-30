var gulp = require('gulp'),
    karma = require('karma'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    inject = require('gulp-inject-string')

gulp.task('build', function() {
  gulp.src('src/angularJwt/**/*.js')
    .pipe(concat('angular-jwt.js'))
    .pipe(inject.wrap('(function() {\n\n\n', '\n}());'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('angular-jwt.min.js'))
    .pipe(gulp.dest('./dist'))
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done()).start();
});

gulp.task('test-debug', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma-src-debug.conf.js',
    singleRun: false,
    autoWatch: true
  }, done()).start();
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  new karma.Server({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done()).start();
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  new karma({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done()).start();
});

gulp.task('default', ['test-src', 'build']);
gulp.task('dist', ['test-dist-minified', 'test-dist-concatenated']);
