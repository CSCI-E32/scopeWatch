var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var Server = require('karma').Server;

gulp.task('buildApp', function(){
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('buildVendor', function(){
  return gulp.src([
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/**/*.min.js'])
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('buildCSS', function(){
  return gulp.src([
      './bower_components/bootstrap/dist/css/bootstrap.css',
      './src/css/**/*.css'])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('buildHTML', function(){
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

gulp.task('build', ['buildApp', 'buildCSS', 'buildVendor', 'buildHTML']);


gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test', ['karma']);


gulp.task('connect', function(){
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.html', ['buildHTML']);
  gulp.watch('./src/**/*.css', ['buildCSS']);
  gulp.watch('./src/**/*.js', ['buildApp', 'test']);
});


gulp.task('default', ['build', 'test', 'watch', 'connect']);
