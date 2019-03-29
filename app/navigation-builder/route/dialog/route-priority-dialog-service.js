(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RoutePriorityDialogService', service);

  service.$inject = [
    '$mdDialog',
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function service($mdDialog, moduleScope) {
    self = this;

    function closeDialog() {
      $mdDialog.hide();
    }

    function DialogController($mdDialog){

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
  }
}());
