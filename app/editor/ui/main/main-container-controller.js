(function() {

  angular
    .module('editor.ui')
    .controller('MainContainerController', MainContainerController);

  MainContainerController.$inject = [
    '$window',
    '$mdBottomSheet',
    'NBEVENTS',
    'MainContainerContentService',
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'WorkspaceService',
    'contextTemplate',
    '$mdDialog'
  ];

  function MainContainerController(
    $window,
    $mdBottomSheet,
    NBEVENTS,
    MainContainerContentService,
    NavigationBuilderScopeService,
    WorkspaceService,
    contextTemplate,
    $mdDialog
  ) {
    var self = this;

    self.showQuestionsMenu = showQuestionsMenu;
    self.startNavigationBuilder = startNavigationBuilder;
    self.preview = preview;

    init();

    function init() {
      MainContainerContentService.init(self);
      self.template = contextTemplate;
    }

    function showQuestionsMenu() {
      $mdDialog.show({
        templateUrl: 'app/editor/ui/survey-item-palette/bottom-sheet.html',
        disableParentScroll: false,
        parent: angular.element(document.body),
        clickOutsideToClose:true,
      });
    }

    function preview() {
         window.open(document.URL.replace('editor','preview'));
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
  }
}());
