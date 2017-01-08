var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var PATH = './';

gulp.task('server', function() {
  browserSync({
    server:{
      baseDir:'./'
    }
  });

  gulp.watch(['*.html','js/*.js'], {cwd:'./'}, reload);
})
