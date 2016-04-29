(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusAddButtonController', OtusAddButtonController);

    OtusAddButtonController.$inject = [
        '$scope',
        '$element',
        'OtusAddButtonWidgetFactory'
    ];

    function OtusAddButtonController($scope, $element, OtusAddButtonWidgetFactory) {
        var self = this;

        init();

        function init() {
            loadWidget();
        }

        function loadWidget() {
            var templateData = {
                scope: $scope,
                element: $element,
                parentWidget: $scope.$parent.widget || $scope.$parent.$parent.widget || {}
            };

            $scope.widget = OtusAddButtonWidgetFactory.create(templateData);
        }
    }

})();
