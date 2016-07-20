(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxTimeValidator', otusMaxTimeValidator);

    otusMaxTimeValidator.$inject = [
        'MaxTimeValidatorWidgetFactory'
    ];

    function otusMaxTimeValidator(MaxTimeValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/max-time/max-time-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MaxTimeValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }
}());
