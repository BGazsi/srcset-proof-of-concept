var gulp = require('gulp');
var watch = require('gulp-watch');
var path = require('path');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');

var distPath = './dist/css';
var stlyePath = './src/css';

gulp.task('fonts', function() {
    return gulp.src(['./node_modules/bootstrap/fonts/*'])
        .pipe(gulp.dest('./dist/fonts'));
});

// Compile less
gulp.task('less', ['fonts'], function() {
    return gulp.src(['./src/css/style.less'])
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(distPath));
});

//watch
gulp.task('watch', ['less'], function() {
    return gulp.src([stlyePath + '/style.less'], { base: './src/css'})
        .pipe(watch([stlyePath + '/style.less'], { base: './src/css'}))
        .pipe(less())
        .pipe(gulp.dest(distPath));
});

gulp.task('production', ['less'], function() {
    return gulp.src(distPath + '/*.css')
        .pipe(cleancss({compatibility: 'ie8'}))
        .pipe(gulp.dest(distPath));
});