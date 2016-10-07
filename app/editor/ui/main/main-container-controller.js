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
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'WorkspaceService',
    'NBEVENTS',
    'otusjs.player.core.player.PlayerService'
  ];

  function MainContainerController(
    $scope, $window, MainContainerContentService, UiBindingService, $mdBottomSheet,
    NavigationBuilderScopeService, WorkspaceService, NBEVENTS, PlayerService) {

    var self = this;

    self.showQuestionsMenu = showQuestionsMenu;
    self.startNavigationBuilder = startNavigationBuilder;
    self.startPreview = startPreview;

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

      NavigationBuilderScopeService.broadcast(NBEVENTS.NAVIGATION_BUILDER_ON, WorkspaceService.getSurvey());
      NavigationBuilderScopeService.onEvent(NBEVENTS.NAVIGATION_UPDATED, WorkspaceService.saveWork);
    }

    function startPreview() {
      PlayerService.setup();
    }
  }
}());
