(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRangeDateValidator', otusRangeDateValidator);

    otusRangeDateValidator.$inject = [
        'RangeDateValidatorWidgetFactory'
    ];

    function otusRangeDateValidator(RangeDateValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/range-date/range-date-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = RangeDateValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }
}());
