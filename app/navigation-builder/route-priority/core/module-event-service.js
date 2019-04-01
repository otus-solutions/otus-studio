(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationRoutePriority')
    .service('otusjs.studio.navigationBuilder.navigationRoutePriority.ModuleEventService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.GraphLayerService',
    'otusjs.studio.navigationBuilder.messenger.InstructorService'
  ];

  function service(moduleScope, GraphLayerService, InstructorService) {
    var self = this;
    var _events = [];

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    function activate() {
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_PRIORITY_MODE_ON, _onRoutePriorityModeOn);
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_PRIORITY_MODE_OFF, _onRoutePriorityModeOff);
      _registerEventListener(moduleScope.NBEVENTS.NAVIGATION_SELECTED, _onNavigationSelected);
      _registerEventListener(moduleScope.NBEVENTS.NAVIGATION_UNSELECTED, _onNavigationUnselected);
    }

    function deactivate() {
      _unregisterEventListeners();
    }

    function _registerEventListener(event, listener) {
      var eventReg = moduleScope.onEvent(event, listener);
      _events.push(eventReg);
    }

    function _unregisterEventListeners() {
      _events.forEach(function(eventReg) {
        eventReg();
      });
    }

    function _onRoutePriorityModeOn(event, node) {
      InstructorService.showMessenger(moduleScope.NBMESSAGES.NAVIGATION_INSPECTOR.SELECT_NAVIGATION);
    }

    function _onRoutePriorityModeOff(event, node) {
      GraphLayerService.clearVisualChanges();
      GraphLayerService.applyVisualChanges();
      InstructorService.clearMessenger();
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }

    function _onNavigationSelected(event, node) {
      GraphLayerService.lockUnrelated(node);
      GraphLayerService.showInputs(node);
      GraphLayerService.showOutputs(node);
      GraphLayerService.setNodeAsInspected(node);
      GraphLayerService.applyVisualChanges();
    }

    function _onNavigationUnselected(event, node) {
      GraphLayerService.clearVisualChanges();
      GraphLayerService.applyVisualChanges();
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }
  }
})();
