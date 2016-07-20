(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusDistinctValidator', otusDistinctValidator);

    otusDistinctValidator.$inject = [
        'DistinctValidatorWidgetFactory'
    ];

    function otusDistinctValidator(DistinctValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/distinct/distinct-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = DistinctValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());
