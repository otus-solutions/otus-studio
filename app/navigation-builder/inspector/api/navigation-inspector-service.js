(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationInspector')
    .service('otusjs.studio.navigationBuilder.navigationInspector.NavigationInspectorService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.navigationInspector.DataService',
    'otusjs.studio.navigationBuilder.navigationInspector.UiEventsService',
    'otusjs.studio.navigationBuilder.navigationInspector.ModuleEventService'
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
      moduleScope.emit(moduleScope.NBEVENTS.INSPECTOR_MODE_ON);
    }

    function deactivate() {
      moduleScope.emit(moduleScope.NBEVENTS.INSPECTOR_MODE_OFF);
      DataService.deactivate();
      ModuleEventService.deactivate();
      UiEventsService.deactivate();
    }
  }
})();
