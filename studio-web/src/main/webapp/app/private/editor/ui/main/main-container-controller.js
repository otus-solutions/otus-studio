(function() {

    angular
        .module('editor.ui')
        .controller('MainContainerController', MainContainerController);

    MainContainerController.$inject = ['MainContainerContentService'];

    function MainContainerController(MainContainerContentService) {
        var self = this;

        /* Public interface */
        self.update = update;

        init();

        function init() {
            MainContainerContentService.registerObserver(self);

            self.showQuestionProperties = false;
        }

        function update(showState) {
            self.showQuestionProperties = showState;
        }
    }

}());
