// Karma configuration
// Generated on Wed Jan 27 2016 14:11:34 GMT-0200 (Horário brasileiro de verão)

module.exports = function(config) {
    var APP_PRIVATE_ROOT_PATH = 'private/';
    var APP_PUBLIC_ROOT_PATH = 'public/';
    var DEPENDENCIES_ROOT_PATH = 'shared/';

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

            // list of files / patterns to load in the browser
            files: [
                /* External dependencies */
                DEPENDENCIES_ROOT_PATH + 'angular/angular.min.js',
                DEPENDENCIES_ROOT_PATH + 'angular-animate/angular-animate.min.js',
                DEPENDENCIES_ROOT_PATH + 'angular-aria/angular-aria.min.js',
                DEPENDENCIES_ROOT_PATH + 'angular-bind-html-compile/angular-bind-html-compile.js',
                DEPENDENCIES_ROOT_PATH + 'angular-material/angular-material.min.js',
                DEPENDENCIES_ROOT_PATH + 'angular-messages/angular-messages.min.js',
                DEPENDENCIES_ROOT_PATH + 'angular-mocks/angular-mocks.js',
                DEPENDENCIES_ROOT_PATH + 'angular-ui-mask/angular-ui-mask.min.js',
                DEPENDENCIES_ROOT_PATH + 'angular-ui-router/angular-ui-router.min.js',
                DEPENDENCIES_ROOT_PATH + 'lokijs/lokijs.min.js',
                DEPENDENCIES_ROOT_PATH + 'lokijs/loki-angular.js',
                DEPENDENCIES_ROOT_PATH + 'moment/moment.js',
                /* Otus platform */
                DEPENDENCIES_ROOT_PATH + 'st-utils/**/*-module.js',
                DEPENDENCIES_ROOT_PATH + 'ui-components/**/*-module.js',
                DEPENDENCIES_ROOT_PATH + 'ui-components/**/*.js',
                DEPENDENCIES_ROOT_PATH + 'otus-domain/**/*-module.js',
                DEPENDENCIES_ROOT_PATH + 'otus-domain/**/*.js',
                DEPENDENCIES_ROOT_PATH + 'otusjs/**/*-module.js',
                DEPENDENCIES_ROOT_PATH + 'otusjs/**/*.js',
                /* Application files */
                'app.js',
                'config/**/*-configuration.js',
                APP_PRIVATE_ROOT_PATH + '**/*-module.js',
                APP_PRIVATE_ROOT_PATH + '**/*.js',
                {
                    pattern: 'tests/unit/**/*-spec.js',
                    included: true
                }
            ],

        // list of files to exclude
        exclude: [
            'tests/unit/**/*-spec-sample.js'
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
            outputFile: 'tests/unit/unit-result.report.html',
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
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });

};
