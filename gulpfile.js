var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	browserify = require('gulp-browserify');

gulp.task('browserify', function() {
	gulp.src('./src/js/main.js')
		.pipe(browserify({ transform: 'reactify' }))
		.pipe(gulp.dest('./build/'));
});

gulp.task('less', function(){
	gulp.src('./src/css/*.less')
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 15 versions']
		}))
		.pipe(gulp.dest('./build/'));
});


// watch files for live reload
gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', ['browserify']);
	gulp.watch('./src/css/*.less', ['less']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'watch', 'less']);