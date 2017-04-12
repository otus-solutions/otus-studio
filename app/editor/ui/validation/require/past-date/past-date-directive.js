(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusPastDateValidator', otusPastDateValidator);

    otusPastDateValidator.$inject = [
        'PastDateValidatorWidgetFactory'
    ];

    function otusPastDateValidator(PastDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/past-date/past-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = PastDateValidatorWidgetFactory.create(scope, element)
            }

        };

        return ddo;
    }

}());
