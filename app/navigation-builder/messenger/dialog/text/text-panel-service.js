(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.TextPanelService', service);

  service.$inject = [
    '$mdPanel'
  ];

  function service($mdPanel) {
    var self = this;
    var _dialogSettings = {};
    var _panelRef = null;

    _init();

    /* Public methods */
    self.showDialog = showDialog;

    function _init() {
      var panelPosition = $mdPanel.newPanelPosition()
      .absolute()
      .center();

      // var panelAnimation = $mdPanelAnimation
      //   .targetEvent($event)
      //   .defaultAnimation('md-panel-animate-fly')
      //   .closeTo('.show-button');

      _dialogSettings.attachTo = angular.element(document.body);
      _dialogSettings.controller = DialogController;
      _dialogSettings.controllerAs = 'ctrl';
      _dialogSettings.position = panelPosition;
      // _dialogSettings.targetEvent = $event;
      _dialogSettings.templateUrl = 'app/navigation-builder/messenger/dialog/text/text-panel-template.html';
    }

    function showDialog(message) {
      _dialogSettings.locals = {
        message: message
      };

      _panelRef = $mdPanel.create(_dialogSettings);
      _panelRef.open().finally(function() {
        _panelRef = undefined;
      });
    }
  }

  function DialogController(message) {
    var self = this;

    self.message = message;

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
