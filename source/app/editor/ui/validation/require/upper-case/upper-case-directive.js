(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusUpperCaseValidator', otusUpperCaseValidator);

    otusUpperCaseValidator.$inject = [
        'UpperCaseValidatorWidgetFactory'
    ];

    function otusUpperCaseValidator(UpperCaseValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/upper-case/upper-case-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = UpperCaseValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());
