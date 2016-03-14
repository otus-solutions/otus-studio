(function() {

    angular
        .module('editor.ui')
        .controller('MainContainerController', MainContainerController);

    MainContainerController.$inject = ['MainContainerContentService'];

    function MainContainerController(MainContainerContentService) {
        var self = this;

        init();

        function init() {
            self.showQuestionProperties = false;
            MainContainerContentService.init(self);
        }
    }

}());
