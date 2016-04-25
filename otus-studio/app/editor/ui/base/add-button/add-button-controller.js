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

        function getContext() {
            if ($scope.$parent.widget)
                return $scope.$parent.widget.parentQuestion || {};
            if ($scope.$parent.$parent)
                return $scope.$parent.$parent.question || {};
            else
                return {};
        }

        function loadWidget() {
            var templateData = {
                scope: $scope,
                element: $element,
                context: getContext()
            };

            $scope.widget = OtusAddButtonWidgetFactory.create(templateData);
        }
    }

})();
