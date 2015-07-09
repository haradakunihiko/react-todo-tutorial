var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var duration = require('gulp-duration');
var gulpUtil = require('gulp-util');
var sass = require('gulp-sass');

var buildScript = function(watch){
    var bundler = browserify(['./src/js/app.js'],{
        cache:{},
        packageCache:{},
        verbose:true,
        debug:true
    });
    if(watch){
        bundler = watchify(bundler);
    }
    bundler.transform(reactify);

    var rebundle = function(){
        gulpUtil.log('start bundle');
        return bundler.bundle()
        .on('error',function(err){
                console.log(err.message);
                this.emit('end');
            })
        .pipe(source('bundle.js'))
        .pipe(duration('rebuilding files'))
        .pipe(gulp.dest('./build/'));
    }

    bundler.on('update',rebundle);
    return rebundle();
}

gulp.task('build:script', function() {
    return buildScript(false);
});
gulp.task('watch:script', function() {
    return buildScript(true);
});
gulp.task('build:sass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('build',['build:script','build:sass']);

gulp.task('watch',['watch:script','build:sass'],function(){
    gulp.watch( './src/sass/**/*.scss', ['build:sass'] );
});