let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let htmlmin = require('gulp-htmlmin');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;

gulp.task('sass', function () {
    var stream = gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('src/css/'));
    return stream;
});

gulp.task('minify-css', () => {
    return gulp.src('src/css/styles.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/css/'));
  });
  
gulp.task('styles', gulp.series('sass', 'minify-css'));

gulp.task('watch', function () {
	return gulp.watch('./scss/**/*.scss', 'js/*.js', gulp.series('styles', 'jsmini'));
});

gulp.task('jsmini', function(){
    return gulp.src(['node_modules/jquery/dist/jquery.slim.js', 'node_modules/bootstrap/dist/js/bootstrap.bundle.js'])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
});