(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.EventsService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.NavigationBuilderService',
  ];

  function service(scopeService, NavigationBuilderService) {
    var self = this;
    var _scope = null;

    /* Public methods */
    self.activate = activate;

    function activate() {
      scopeService.onEvent(scopeService.NBEVENTS.MODULE_MODE_OFF, function(event) {
        NavigationBuilderService.deactiveMode();
      });
    }
  }
})();
