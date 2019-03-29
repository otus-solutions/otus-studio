(function () {
  'use strict';

  angular.module('studio.commons')
    .service("DialogService", Service);

  Service.$inject = ['$mdDialog', '$q'];

  function Service($mdDialog){
    var self = this;

    self.show = show;

    function _buildCustomDialog(data) {
      if (data.url || data.ctrl){
        self.data.url = data.url ? data.url : 'app/shared/commons/dialog/component/dialog-template.html';
        self.data.ctrl = data.ctrl ? data.ctrl : 'dialogController';
      } else {
        self.data.url = 'app/shared/commons/dialog/component/dialog-template.html';
        self.data.ctrl = 'dialogController';
      }
    }

    function show(data) {
      self.data = data;
      self.data.cancel = cancel;
      _buildCustomDialog(data);
      return $mdDialog.show({
        controller: self.data.ctrl,
        locals: { data: self.data },
        templateUrl: self.data.url,
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
