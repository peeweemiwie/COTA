var gulp    = require('gulp'),
    uglify  = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    sass    = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename  = require('gulp-rename'),
    browserSync = require('browser-sync'),
    del     = require('del'),
    reload  = browserSync.reload;

var inputJs   = 'app/js/**/*.js',
    inputScss = 'app/scss/**/*.scss',
    inputHtml = 'app/**/*.html',
    outputJs  = 'app/js/',
    outputCss = 'app/css/';

gulp.task('scripts',  function(){
  gulp.src([inputJs, '!app/js/**/*.min.js'])
  .pipe(plumber())
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest(outputJs))
  .pipe(reload({stream: true}))
});

gulp.task('sass', function(){
  gulp.src(inputScss)
  .pipe(plumber())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest(outputCss))
  .pipe(reload({stream: true}))
});

gulp.task('html', function(){
  gulp.src('app/**/*.html')
  .pipe(reload({stream: true}))
});

// ////////////////////////////////////////////////
// Browser-Sync Tasks
// // /////////////////////////////////////////////

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});

// task to run build server for testing final app
// gulp.task('build:serve', function() {
//     browserSync({
//         server: {
//             baseDir: "./build/"
//         }
//     });
// });

// ////////////////////////////////////////////////
// Build Tasks
// // /////////////////////////////////////////////

gulp.task('build:cleanfolder', function(cb){
  // del([
  //   'build/**/*'
  // ], cb);
  console.log(2);
});

gulp.task('build:copy', ['build:cleanfolder'], function(){
//gulp.task('build:copy', function(){
  return gulp.src('app/**/*/')
  .pipe(gulp.dest('build/'))
  console.log(1);
});

//gulp.task('build:remove', ['build:copy'], function(cb){
gulp.task('build:remove', function(){
  // del([
  //   'build/scss/',
  //   'build/js/!(*.min.js)'
  // ], cb);
  console.log(3);
});

//gulp.task('build', ['build:copy', 'build:remove']);
gulp.task('build', ['build:copy']);

// ////////////////////////////////////////////////
// Browser-Sync Tasks
// // /////////////////////////////////////////////

// gulp.task('browser-sync', function(){
//   browserSync({
//     server: {
//       baseDir: './app/'
//     }
//   });
// });
//
// gulp.task('build:serve', function(){
//   browserSync({
//     server: {
//       baseDir: './build/'
//     }
//   });
// });

gulp.task('watch', function(){
  gulp.watch(inputJs, ['scripts']);
  gulp.watch(inputScss, ['sass']);
  gulp.watch(inputHtml, ['html']);
});

gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);
