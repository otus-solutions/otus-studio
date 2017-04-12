(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.messenger')
    .component('otusMessengerInstructor', {
      templateUrl: 'app/navigation-builder/messenger/instructor/instructor-template.html',
      controller: component
    });

  component.$inject = [
    '$scope',
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function component($scope, scopeService) {
    var self = this;

    self.message = {};
    self.isVisible = false

    /* Component cicle methods */
    self.$onInit = onInit;

    function onInit() {
      scopeService.onEvent(scopeService.NBEVENTS.SHOW_MESSENGER, function(event, message) {
        self.isVisible = true;
        self.message = message;
      });

      scopeService.onEvent(scopeService.NBEVENTS.HIDE_MESSENGER, function(event) {
        self.isVisible = false;
      });
    }
  }
})();
