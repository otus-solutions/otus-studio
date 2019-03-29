(function () {
  'use strict';

  angular.module('studio.commons')
    .service("DialogService", Service);

  Service.$inject = ['$mdDialog', '$q'];

  function Service($mdDialog){
    var self = this;

    self.show = show;

    function show(data) {
      self.data = data;
      self.data.cancel = cancel;

      return $mdDialog.show({
        controller: 'dialogController',
        locals: { data: self.data },
        templateUrl: 'app/shared/commons/dialog/component/dialog-template.html',
        parent: angular.element(document.body),
        controllerAs:"$ctrl",
        clickOutsideToClose: true
      });
    }

    function cancel() {
      $mdDialog.cancel();
    }
  }
}());
