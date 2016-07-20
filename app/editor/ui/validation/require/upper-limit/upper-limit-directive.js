(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusUpperLimitValidator', otusUpperLimitValidator);

    otusUpperLimitValidator.$inject = [
        'UpperLimitValidatorWidgetFactory'
    ];

    function otusUpperLimitValidator(UpperLimitValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/upper-limit/upper-limit-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = UpperLimitValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());
