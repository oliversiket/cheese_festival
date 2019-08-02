let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let htmlmin = require('gulp-htmlmin');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;

gulp.task('createbootstrapsass', function () {
    var stream = gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('src/css/'));
    return stream;
});

gulp.task('customsassfile', function () {
    var stream = gulp.src('src/scss/all.scss')
        .pipe(sass())
        .pipe(rename('custom.css'))
        .pipe(gulp.dest('src/css/'));
    return stream;
});

gulp.task('minify-css', () => {
    return gulp.src(['src/css/styles.css','src/css/custom.css'])
      .pipe(concat('styles.css'))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/css/'));
  });
  
gulp.task('styles', gulp.series('customsassfile', 'minify-css'));

gulp.task('watch', function () {
	return gulp.watch('src/scss/*.scss', gulp.series('styles'));
});

gulp.task('htmlmin', function () {
    return gulp.src('src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('dist/'));
  });

gulp.task('jsmini', function(){
    return gulp.src(['node_modules/jquery/dist/jquery.slim.js', 'node_modules/bootstrap/dist/js/bootstrap.bundle.js'])
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
});