(function() {

    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();

    /* Task registry */
    gulp.task('default', defaultTask);

    function defaultTask() {
        console.log('Do stuff here...');
    }

    gulp.task('browser-sync', function() {
        browserSync.init({
            server: {
                baseDir: "../"
            },
            startPath: "/otus-studio"
        });

        gulp.watch([
            'app/**/*.html',
            'app/**/*.js',
            'app/**/*.css'
        ]).on('change', browserSync.reload);
    });

}());
