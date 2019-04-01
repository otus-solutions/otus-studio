(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .service('otusjs.studio.navigationBuilder.navigationRoutePriority.NavigationRoutePriorityService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.navigationRoutePriority.DataService',
    'otusjs.studio.navigationBuilder.navigationRoutePriority.UiEventsService',
    'otusjs.studio.navigationBuilder.navigationRoutePriority.ModuleEventService'
  ];

  function service(moduleScope, DataService, UiEventsService, ModuleEventService) {
    var self = this;

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      deactivate();
      DataService.activate(survey);
      UiEventsService.activate();
      ModuleEventService.activate();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_PRIORITY_MODE_ON);
    }

    function deactivate() {
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_PRIORITY_MODE_OFF);
      DataService.deactivate();
      ModuleEventService.deactivate();
      UiEventsService.deactivate();
    }

    //-----------------------------------------------------
    // Priority editor
    //-----------------------------------------------------


  }
})();
