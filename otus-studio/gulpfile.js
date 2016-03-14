(function() {

    var gulp = require('gulp');

    /* Task registry */
    gulp.task('default', defaultTask);

    /* Task implementation */
    // function defaultTask() {
    //     return gulp.src('app/*/*.html')
    //         .pipe(useref())
    //         .pipe(gulp.dest('dist'));
    // }

    function defaultTask() {
        console.log('Do stuff here...');
    }

}());
