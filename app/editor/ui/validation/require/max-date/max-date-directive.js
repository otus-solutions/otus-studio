(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxDateValidator', otusMaxDateValidator);

    otusMaxDateValidator.$inject = [
        'MaxDateValidatorWidgetFactory'
    ];

    function otusMaxDateValidator(MaxDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/max-date/max-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MaxDateValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }
}());
