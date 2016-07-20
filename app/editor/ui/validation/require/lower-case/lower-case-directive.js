(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusLowerCaseValidator', otusLowerCaseValidator);

    otusLowerCaseValidator.$inject = [
        'LowerCaseValidatorWidgetFactory'
    ];

    function otusLowerCaseValidator(LowerCaseValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/lower-case/lower-case-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = LowerCaseValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());
