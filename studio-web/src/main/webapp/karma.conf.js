// Karma configuration
// Generated on Wed Jan 27 2016 14:11:34 GMT-0200 (Horário brasileiro de verão)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',

            'app/shared/lib/angularjs/external-lib/angular-messages.min.js',
            'app/shared/lib/angularjs/external-lib/angular-ui-mask.min.js',
            'app/shared/lib/angularjs/external-lib/angular-ui-router.min.js',
            'app/shared/lib/angularjs/md/angular-animate.min.js',
            'app/shared/lib/angularjs/md/angular-aria.min.js',
            'app/shared/lib/angularjs/md/angular-material.min.js',

            'app/private/home/module.js',
            'app/private/home/home-ctrl.js',
            'app/private/user/module.js',
            'app/private/user/management/users-ctrl.js',
            'app/private/repository/repository.module.js',
            'app/private/repository/repository.service.js',
            'app/private/repository/repository.ctrl.js',
            'app/app.js',
            'config/theme.js',
            'app/private/utils.module.js',
            'app/private/studio/survey.module.js',
            'app/private/studio/memory.module.js',
            'app/private/studio/editing-engine.module.js',
            'app/private/studio/survey-editing-engine.module.js',
            'app/private/studio/studio.module.js',
            'app/private/studio/edit/sheet/preview/preview-ctrl.js',
            'app/private/studio/edit/container/container.module.js',
            'app/private/studio/toolbar-ctrl.js',
            , {
                pattern: 'tests/unit/*-spec.js',
                included: true
            }
        ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html'],

    htmlReporter: {
        outputFile: 'tests/unit/units.html',

        //Optional
        pageTitle: 'Unit Tests'

    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
