(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusRemoveButtonController', OtusRemoveButtonController);

    OtusRemoveButtonController.$inject = [
        '$scope',
        '$element',
        'OtusRemoveButtonWidgetFactory'
    ];

    function OtusRemoveButtonController($scope, $element, OtusRemoveButtonWidgetFactory) {
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

            $scope.widget = OtusRemoveButtonWidgetFactory.create(templateData);
        }
    }

})();
