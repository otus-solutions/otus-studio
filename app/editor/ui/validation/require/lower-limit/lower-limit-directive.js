(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusLowerLimitValidator', otusLowerLimitValidator);

        otusLowerLimitValidator.$inject=[
          'LowerLimitValidatorWidgetFactory'
        ];

    function otusLowerLimitValidator(LowerLimitValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/lower-limit/lower-limit-validator.html',
            link: function linkFunc(scope, element) {
               scope.widget = LowerLimitValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());
