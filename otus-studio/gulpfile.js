(function() {

    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var browserSyncSpa = require('browser-sync-middleware-spa');

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

}());
