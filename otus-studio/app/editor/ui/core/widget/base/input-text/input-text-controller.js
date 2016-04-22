(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusInputTextController', OtusInputTextController);

    OtusInputTextController.$inject = [
        '$scope',
        '$element',
        'OtusInputTextWidgetFactory'
    ];

    function OtusInputTextController($scope, $element, OtusInputTextWidgetFactory) {
        var self = this;
        var data = {
            scope: $scope,
            element: $element
        };

        init();

        function init() {
            OtusInputTextWidgetFactory.create(data);

            // Object.keys($scope.widget.events).forEach(function(event) {
            //     $element.on(event, $scope.widget.events[event]);
            // });
        }
    }

})();
