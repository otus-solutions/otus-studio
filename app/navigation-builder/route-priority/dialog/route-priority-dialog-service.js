(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .service('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService', service);

  service.$inject = [
    '$mdDialog',
    'WorkspaceService'

  ];

  function service($mdDialog, WorkspaceService) {
    self = this;
    var _dialogSettings = {};

    /* Public interface */
    self.showDialog = showDialog;
    self.closeDialog = closeDialog;

    _init();

    function _init() {
      _setupDialogConfiguration();

    }


    function showDialog(node, survey) {
      _dialogSettings.locals = {
        node: node,
        survey: survey
      };
      $mdDialog.show(_dialogSettings);
    }

    function closeDialog() {
      $mdDialog.hide();
    }

    function _setupDialogConfiguration() {
      _dialogSettings.templateUrl = 'app/navigation-builder/route-priority/dialog/route-priority-dialog-template.html';
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.escapeToClose = false;
      _dialogSettings.fullscreen = true;
      _dialogSettings.hasBackdrop = true;
    }

    function DialogController($mdDialog, node, survey) {
      var self = this;
      self.node = node;
      self.changed = false;

      /* Public interface */
      self.up = up;
      self.down = down;
      self.cancel = cancel;
      self.confirm = confirm;

      function up(originalPosition) {
        // TODO: utilizar o model neste momento!
        // para isso você deve saber sobre a lista de navegação qual você modificar
        console.log(WorkspaceService.getSurvey().NavigationManager.getNavigationList());
        WorkspaceService.getSurvey().NavigationManager.getNavigationList().filter(function (navigation) {
          // TODO:
        });

        self.changed = true;
      }

      function down(originalPosition) {
        self.node.orderNavigationByPriority(originalPosition, originalPosition + 1);
        self.changed = true;
      }

      function cancel(response) {
        $mdDialog.hide(response);
      }

      function confirm(response) {
        self.changed = false;
        $mdDialog.hide(response);
      }

    }
  }
}());
