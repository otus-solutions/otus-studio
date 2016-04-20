(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('RouteCreatorController', RouteCreatorController);

    RouteCreatorController.$inject = [
        '$scope',
        '$element',
        'RouteCreatorContentService'
    ];

    function RouteCreatorController($scope, $element, RouteCreatorContentService) {
        var self = this;

        init();

        function init() {
            RouteCreatorContentService.init($scope, $element);
            reload();
        }

        function reload() {
            RouteCreatorContentService.reload();
        }
    }

})();
