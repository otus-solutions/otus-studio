(function() {

    angular
        .module('editor.ui')
        .controller('MainContainerController', MainContainerController);

    MainContainerController.$inject = [
        '$scope',
        'MainContainerContentService',
        'WorkspaceService',
        'UiBindingService'
    ];

    function MainContainerController($scope, MainContainerContentService, WorkspaceService, UiBindingService) {
        var self = this;

        init();

        function init() {
            self.showQuestionProperties = false;
            MainContainerContentService.init(self);
        }

        UiBindingService.setScope($scope);
    }

}());
