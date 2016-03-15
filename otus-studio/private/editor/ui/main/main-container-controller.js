(function() {

    angular
        .module('editor.ui')
        .controller('MainContainerController', MainContainerController);

    MainContainerController.$inject = ['MainContainerContentService', 'WorkspaceService'];

    function MainContainerController(MainContainerContentService, WorkspaceService) {
        var self = this;

        init();

        function init() {
            self.showQuestionProperties = false;
            MainContainerContentService.init(self);
        }
    }

}());
