// Karma configuration
// Generated on Wed Jan 27 2016 14:11:34 GMT-0200 (Horário brasileiro de verão)

module.exports = function(config) {
    var APP_ROOT_PATH = 'app/';
    var DEPENDENCIES_ROOT_PATH = 'app/shared/';
    var NODE_MODULES_ROOT_PATH = 'node_modules/';

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            /* External dependencies */
            NODE_MODULES_ROOT_PATH + 'jquery/dist/jquery.min.js',
            NODE_MODULES_ROOT_PATH + 'angular/angular.min.js',
            NODE_MODULES_ROOT_PATH + 'angular-animate/angular-animate.min.js',
            NODE_MODULES_ROOT_PATH + 'angular-aria/angular-aria.min.js',
            NODE_MODULES_ROOT_PATH + 'angular-bind-html-compile-ci-dev/angular-bind-html-compile.js',
            NODE_MODULES_ROOT_PATH + 'angular-material/angular-material.min.js',
            NODE_MODULES_ROOT_PATH + 'angular-immutable/dist/immutable.min.js',
            DEPENDENCIES_ROOT_PATH + 'angular-indexed-db/angular-indexed-db.min.js',
            NODE_MODULES_ROOT_PATH + 'angular-messages/angular-messages.min.js',
            NODE_MODULES_ROOT_PATH + 'angular-mocks/angular-mocks.js',
            NODE_MODULES_ROOT_PATH + 'angular-mousewheel/mousewheel.js',
            NODE_MODULES_ROOT_PATH + 'angular-resource/angular-resource.min.js',
            NODE_MODULES_ROOT_PATH + 'angular-ui-router/release/angular-ui-router.min.js',
            NODE_MODULES_ROOT_PATH + 'lokijs/build/lokijs.min.js',
            NODE_MODULES_ROOT_PATH + 'lokijs/src/loki-angular.js',
            NODE_MODULES_ROOT_PATH + 'moment/min/moment.min.js',
            NODE_MODULES_ROOT_PATH + 'js-base64/base64.min.js',
            NODE_MODULES_ROOT_PATH + 'node-uuid/uuid.js',
            NODE_MODULES_ROOT_PATH + 'graphdracula/js/raphael-min.js',
            NODE_MODULES_ROOT_PATH + 'graphdracula/js/dracula_graffle.js',
            NODE_MODULES_ROOT_PATH + 'graphdracula/js/dracula_graph.js',
            NODE_MODULES_ROOT_PATH + 'angular-input-masks/releases/angular-input-masks-dependencies.js',
            NODE_MODULES_ROOT_PATH + 'angular-input-masks/releases/angular-input-masks.js',
            NODE_MODULES_ROOT_PATH + 'otus-domain-client/dist/otus-domain-client-min.js',
            NODE_MODULES_ROOT_PATH + 'tinycolor2/dist/tinycolor-min.js',
            NODE_MODULES_ROOT_PATH + 'md-color-picker/dist/mdColorPicker.min.js',
            DEPENDENCIES_ROOT_PATH + 'text-edition-menu/**/*-module.js',
            DEPENDENCIES_ROOT_PATH + 'text-edition-menu/**/*.js',
            /* Otus platform */
            NODE_MODULES_ROOT_PATH + 'otus-model-js/dist/st-utils-min.js',
            NODE_MODULES_ROOT_PATH + 'otus-preview-js/dist/otus-preview-js/scripts/otusjs-player-min.js',
            NODE_MODULES_ROOT_PATH + 'otus-validation-js/dist/otus-validation-min.js',
            NODE_MODULES_ROOT_PATH + 'otus-model-js/dist/otus-model-min.js',
            DEPENDENCIES_ROOT_PATH + 'ui-components/**/*-module.js',
            DEPENDENCIES_ROOT_PATH + 'ui-components/**/*.js',
            /* Application files */
            APP_ROOT_PATH + 'app.js',
            APP_ROOT_PATH + 'config/**/*-configuration.js',
            APP_ROOT_PATH + '**/*-module.js',
            APP_ROOT_PATH + '**/*.js', {
                pattern: 'tests/**/*-spec.js',
                included: true
            }
        ],

        // list of files to exclude
        exclude: [
            'tests/unit/**/*-spec-ignore.js',
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/**/*.js': ['coverage']
        },
        // optionally, configure the reporter
        coverageReporter: {
            reporters: [{
                type: 'html',
                dir: 'target/test-coverage/'
            }, {
                type: 'lcov',
                dir: 'target/test-coverage/',
                subdir: 'report-lcov'
            }]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'html', 'coverage', 'lcov'],

        htmlReporter: {
            outputFile: 'target/unit-result.report.html',
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
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });

};
