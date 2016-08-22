(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationMessengerService', service);

  service.$inject = [
    'NBEVENTS'
  ];

  function service(NBEVENTS) {
    var self = this;
    var _scope = null;

    /* Public methods */
    self.setScope = setScope;
    self.showMessenger = showMessenger;
    self.clearMessenger = clearMessenger;

    function setScope(scope) {
      _scope = scope;
    }

    function showMessenger(message) {
      _scope.$broadcast(_scope.events.SHOW_MESSENGER, message);
    }

    function clearMessenger() {
      _scope.$broadcast(_scope.events.HIDE_MESSENGER);
    }
  }
})();
