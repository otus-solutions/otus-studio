(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = [
        '$scope',
        '$element',
        'ModelBuilderHubService',
        'NavigationEditorContentService',
        'UIUpdateCommandFactory'
    ];

    function NavigationController($scope, $element, ModelBuilderHubService, NavigationEditorContentService, UIUpdateCommandFactory) {
        var self = this;

        /* Public interface */
        self.update = update;

        /* Initialization */
        init();

        function init() {
            $scope.routes = [];

            ModelBuilderHubService.plugToNavigationBuilder(self);
            NavigationEditorContentService.init($scope, $element);
        }

        function update(update) {
            var uiUpdateCommand = UIUpdateCommandFactory.create(update);
            uiUpdateCommand.execute();
        }
    }

}());
