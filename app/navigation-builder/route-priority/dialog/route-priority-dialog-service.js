(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .service('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService', service);

  service.$inject = [
    '$mdDialog'
  ];

  function service($mdDialog) {
    self = this;

    /* Public interface */
    self.showDialog = showDialog;
    self.closeDialog = closeDialog;


    function showDialog(node) {
      self.node = node;

      return $mdDialog.show({
        controller: 'dialogController',
        locals: { node: self.node },
        templateUrl: 'app/navigation-builder/route-priority/dialog/route-priority-dialog-template.html',
        parent: angular.element(document.body),
        controllerAs:"ctrl",
        clickOutsideToClose: true,
        escapeToClose : false,
        fullscreen : true,
        hasBackdrop : true
      });
    }

    function closeDialog() {
      $mdDialog.hide();
    }
  }
}());
