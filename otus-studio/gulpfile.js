(function() {

    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var browserSyncSpa = require('browser-sync-middleware-spa');
    var bump = require('gulp-bump');
    var uglify = require("gulp-uglify");
    var minify = require('gulp-minify');
    var concat = require('gulp-concat');

    var baseDir = __dirname + '/app/index.html';

    /* Task registry */
    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: '../',
                middleware: [
                    browserSyncSpa(/^[^\.]+$/, baseDir)
                ]
            },
            startPath: 'otus-studio/login'
        });

        gulp.watch([
            'app/**/*.html',
            'app/**/*.js',
            'app/**/*.css'
        ]).on('change', browserSync.reload);
    });

    gulp.task('upgrade-version', function(value) {
        gulp.src('./package.json')
            .pipe(bump({
                version: process.env.npm_config_value
            }))
            .pipe(gulp.dest('./'));
    });

    gulp.task('compress', function() {
        gulp.src('app/**/*.js')
            .pipe(concat('otus-studio.js'))
            .pipe(uglify())
            .pipe(minify())
            .pipe(gulp.dest('dist'));
    });

}());
