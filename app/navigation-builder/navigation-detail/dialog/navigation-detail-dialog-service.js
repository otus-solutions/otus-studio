(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationDataDialogService', service);

  service.$inject = [
    '$mdDialog',
    'otusjs.studio.navigationBuilder.NavigationBuilderService'
  ];

  function service($mdDialog, NavigationBuilderService) {
    var self = this;
    var _dialogSettings = {};

    /* Public interface */
    self.showDialog = showDialog;

    _init();

    function _init() {
      _dialogSettings.templateUrl = 'app/navigation-builder/navigation-detail/dialog/navigation-detail-dialog-template.html';
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'controller';
      _dialogSettings.escapeToClose = true;
      _dialogSettings.fullscreen = true;
      _dialogSettings.hasBackdrop = true;
    }

    function showDialog(sigmaNode) {
      NavigationBuilderService.selectNode(sigmaNode);
      var navigation = NavigationBuilderService.selectedNavigation();
      _dialogSettings.locals = { navigation: navigation };
      $mdDialog.show(_dialogSettings);
    }
  }

  function DialogController($mdDialog, navigation) {
    var self = this;

    self.navigation = navigation;

    /* Public interface */
    self.cancel = cancel;
    self.confirm = confirm;

    function cancel(response) {
      $mdDialog.hide(response);
    }

    function confirm(response) {
      $mdDialog.hide(response);
    }
  }
})();
