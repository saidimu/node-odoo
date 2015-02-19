var gulp  = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('default', function () {
  gulp.watch(['./lib/**/*', './test/**/*'], function () {
    return gulp.src(['./test/*.js'], { read: false })
      .pipe(mocha({ reporter: 'spec' }));
  });
});
