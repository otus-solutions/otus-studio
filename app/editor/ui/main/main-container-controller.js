(function() {

    angular
        .module('editor.ui')
        .controller('MainContainerController', MainContainerController);

    MainContainerController.$inject = [
        '$scope',
        'MainContainerContentService',
        'WorkspaceService',
        'UiBindingService',
        '$mdBottomSheet'
    ];

    function MainContainerController($scope, MainContainerContentService, WorkspaceService, UiBindingService, $mdBottomSheet) {
        var self = this;
        self.showQuestionsMenu = showQuestionsMenu;

        init();

        function init() {
            self.showQuestionProperties = false;
            MainContainerContentService.init(self);
          //  self.showQuestionsMenu();
            console.log("chamei");
        }

        UiBindingService.setScope($scope);

        function showQuestionsMenu() {
            $mdBottomSheet.show({
                templateUrl: 'app/editor/ui/survey-item-palette/bottom-sheet.html',
                //clickOutsideToClose: true,
                disableBackdrop: true,
                disableParentScroll: false
            });

            //console.log("tchururu");
        }
    }


}());
