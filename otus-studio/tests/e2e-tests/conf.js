exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',

    allScriptsTimeout: 11000,

    specs: [
        '*.js'
    ],

    baseUrl: 'http://localhost:8080/',

    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: [
                '--start-maximized'
            ]
        }
    },

    framework: 'jasmine2',

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: false,
        showColors: true,
        includeStackTrace: true
    }
};
