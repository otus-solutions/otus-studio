(function () {
  'use strict';

  angular.module('studio.commons')
    .service("DialogService", Service);

  Service.$inject = ['$mdDialog', '$rootScope'];

  function Service($mdDialog, $rootScope){
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

      if ("buttons" in self.data) {
        self.data.buttons.forEach(function (button) {
          if(!button.action){
            button.action = cancel;
          }
        });
      } else {
        self.data.buttons = [
          {message:'OK',class: 'md-primary md-raised md-layoutTheme-theme', action: cancel}
        ];
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
      $rootScope.$broadcast("clearSurveyItemSelected");
    }
  }
}());
