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

        function loadWidget() {
            var templateData = {
                scope: $scope,
                element: $element
            };

            $scope.widget = OtusRemoveButtonWidgetFactory.create(templateData);
        }
    }

})();
