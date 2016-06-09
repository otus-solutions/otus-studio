(function() {

    angular
        .module('editor.ui')
        .controller('MainContainerController', MainContainerController);

    MainContainerController.$inject = [
        '$scope',
        'MainContainerContentService',
        'UiBindingService',
        '$mdBottomSheet'
    ];

    function MainContainerController($scope, MainContainerContentService, UiBindingService, $mdBottomSheet) {
        var self = this;

        self.showQuestionsMenu = showQuestionsMenu;

        init();

        function init() {
            MainContainerContentService.init(self);
        }
        UiBindingService.setScope($scope);

        function showQuestionsMenu() {
            $mdBottomSheet.show({
                templateUrl: 'app/editor/ui/survey-item-palette/bottom-sheet.html',
                //disableBackdrop: true,
                disableParentScroll: false
            });
        }
    }

}());
