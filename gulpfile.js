var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	browserify = require('gulp-browserify');


gulp.task('browserify', function() {
	gulp.src('./src/js/main.js')
		.pipe(browserify({ transform: 'reactify' }))
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(gulp.dest('./build/'));
});

gulp.task('babel', function(){
	gulp.src('./src/js/**/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
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
	gulp.watch('./src/js/js_test.js', ['babel']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'watch', 'less']);