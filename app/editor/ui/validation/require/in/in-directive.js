(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusInValidator', otusInValidator);

    otusInValidator.$inject = [
        'InValidatorWidgetFactory'
    ];

    function otusInValidator(InValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/in/in-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = InValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());
