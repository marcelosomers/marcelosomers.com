var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('gulp-cssnano'),
  gutil = require('gulp-util'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync'),
  shell = require('gulp-shell')
;

var config = {
  drafts: !!gutil.env.drafts
};

gulp.task('build:styles', function() {
  return gulp.src('./_sass/blog.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: ['last 2 versions']
    })]))
    .pipe(cssnano({
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('./_site/css'))
    .pipe(browserSync.stream());
});

gulp.task('build:jekyll', function() {
  var shellCommand = 'jekyll build --config _config.yml, _development_config.yml';
  if (config.drafts) {
    shellCommand += ' --drafts';
  };

  return gulp.src('./')
    .pipe(shell(shellCommand))
    .on('error', gutil.log);
});

gulp.task('build', function(cb) {
  runSequence(['build:styles'], 'build:jekyll', cb);
});

gulp.task('build:jekyll:watch', ['build:jekyll'], function(cb) {
  browserSync.reload();
  cb();
});

gulp.task('serve', ['build'], function() {

  browserSync.init({
    server: './_site/',
    open: false,
    notify: false
  });

  // Watch site settings
  gulp.watch(['_config.yml', '_development_config.yml'], ['build:jekyll:watch']);

  // Watch app .scss files, changes are piped to browserSync
  gulp.watch('_sass/**/*.scss', ['build:styles']);

  // Watch Jekyll posts
  gulp.watch('_posts/**/*.+(md|markdown|MD)', ['build:jekyll:watch']);
  gulp.watch('_talks/**/*.+(md|markdown|MD)', ['build:jekyll:watch']);

  // Watch Jekyll drafts if --drafts flag was passed
  if (config.drafts) {
    gulp.watch('_drafts/*.+(md|markdown|MD)', ['build:jekyll:watch']);
  }

  // Watch Jekyll html files
  gulp.watch(['**/*.html', '!_site/**/*.*'], ['build:jekyll:watch']);
});
