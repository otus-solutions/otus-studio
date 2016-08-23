(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.messenger')
    .service('otusjs.studio.navigationBuilder.messenger.InstructorService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function service(scopeService) {
    var self = this;

    /* Public methods */
    self.showMessenger = showMessenger;
    self.clearMessenger = clearMessenger;

    function showMessenger(message) {
      scopeService.broadcast(scopeService.NBEVENTS.SHOW_MESSENGER, message);
    }

    function clearMessenger() {
      scopeService.broadcast(scopeService.NBEVENTS.HIDE_MESSENGER);
    }
  }
})();
