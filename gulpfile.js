var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var PATH = './';

gulp.task('reload', function() {
  browserSync({
    server:{
      baseDir:'./'
    }
  });

  gulp.watch(['views/*.html','js/*.js'], {cwd:'./'}, reload);
});
