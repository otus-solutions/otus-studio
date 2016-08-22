(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMessenger', {
      templateUrl: 'app/navigation-builder/messenger/messenger-template.html',
      controller: component
    });

  component.$inject = [
    '$scope'
  ];

  function component($scope) {
    var self = this;

    self.message = {};
    self.isVisible = false

    /* Component cicle methods */
    self.$onInit = onInit;

    function onInit() {
      $scope.$on($scope.$parent.events.SHOW_MESSENGER, function(event, message) {
        self.isVisible = true;
        self.message = message;
      });

      $scope.$on($scope.$parent.events.HIDE_MESSENGER, function(event) {
        self.isVisible = false;
      });
    }
  }
})();
