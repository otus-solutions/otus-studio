(function() {

  angular
    .module('editor.ui')
    .controller('MainContainerController', MainContainerController);

  MainContainerController.$inject = [
    '$scope',
    '$window',
    'MainContainerContentService',
    'UiBindingService',
    '$mdBottomSheet',
    'otusjs.studio.navigationBuilder.NavigationBuilderAPI',
    'WorkspaceService'
  ];

  function MainContainerController($scope, $window, MainContainerContentService, UiBindingService, $mdBottomSheet, NavigationBuilderAPI, WorkspaceService) {
    var self = this;

    self.showQuestionsMenu = showQuestionsMenu;
    self.startNavigationBuilder = startNavigationBuilder;

    init();

    function init() {
      MainContainerContentService.init(self);
      UiBindingService.setScope($scope);
    }

    function showQuestionsMenu() {
      $mdBottomSheet.show({
        templateUrl: 'app/editor/ui/survey-item-palette/bottom-sheet.html',
        //disableBackdrop: true,
        disableParentScroll: false
      });
    }

    function startNavigationBuilder() {
      var $navContainer = $('#navigation-preview-container');
      var $tabContainer = $navContainer.parent().parent().parent();
      $navContainer.css('margin-top', '10px');
      $navContainer.css('height', ($tabContainer.height() - 10) + 'px');
      $window.addEventListener('resize', function() {
        $navContainer.css('height', ($tabContainer.height() - 10) + 'px');
      });

      var navigations = WorkspaceService.getSurvey().NavigationManager.getNavigationList();
      NavigationBuilderAPI.loadTemplateNavigations(navigations);
      $scope.$broadcast(NavigationBuilderAPI.NBEVENTS.MAP_CONTAINER_READY);
    }
  }
}());
