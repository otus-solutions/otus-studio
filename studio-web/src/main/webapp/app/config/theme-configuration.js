(function() {

    angular
        .module('studio')
        .config(themeConfiguration);

    var themeConfiguration = function($mdThemingProvider) {

        $mdThemingProvider.theme('layoutTheme')
            .primaryPalette('blue', {
                'default': 'A200',
                'hue-1': '200'
            }).accentPalette('blue-grey', {
                'default': '900',
                'hue-1': '200'
            }).warnPalette('red');


        /* Configuration theme */
        $mdThemingProvider.theme('layoutTheme');
        // $mdThemingProvider.theme('surveyEditorTheme');

        /*Configuration icons*/
        /* 24 is the size default of icons */
        $mdIconProvider.defaultIconSet('shared/img/icons/mdi.svg', 24);
    };

}());
