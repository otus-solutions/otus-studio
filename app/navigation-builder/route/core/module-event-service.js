(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.ModuleEventService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.GraphLayerService',
    'otusjs.studio.navigationBuilder.messenger.InstructorService',
    'otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService'
  ];

  function service(moduleScope, GraphLayerService, InstructorService, RouteDialogService) {
    var self = this;
    var _events = [];

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    function activate() {
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_MODE_ON, _onRouteModeOn);
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_MODE_OFF, _onRouteModeOff);
      _registerEventListener(moduleScope.NBEVENTS.ORIGIN_NODE_SELECTED, _onOriginNodeSelected);
      _registerEventListener(moduleScope.NBEVENTS.ORIGIN_NODE_UNSELECTED, _onOriginNodeUnselected);
      _registerEventListener(moduleScope.NBEVENTS.PRIORITY_NODE_SELECTED, _onPriorityNodeSelected);
      _registerEventListener(moduleScope.NBEVENTS.DESTINATION_NODE_SELECTED, _onDestinationNodeSelected);
      _registerEventListener(moduleScope.NBEVENTS.DESTINATION_NODE_UNSELECTED, _onDestinationNodeUnselected);
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_DELETED, _onRouteDeleted);
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_BUILD_SAVED, _onRouteBuildSaved);
      _registerEventListener(moduleScope.NBEVENTS.ROUTE_BUILD_CANCELED, _onRouteBuildCanceled);
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

    function _onRouteModeOn(event, node) {
      InstructorService.showMessenger(moduleScope.NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
    }

    function _onRouteModeOff(event, node) {
      GraphLayerService.clearVisualChanges();
      GraphLayerService.applyVisualChanges();
      InstructorService.clearMessenger();
      deactivate();
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }

    function _onPriorityNodeSelected() {
      GraphLayerService.lockPreviousNodeOf(node);
      GraphLayerService.setNodeAsTrailhead(node);
      GraphLayerService.applyVisualChanges();
      // InstructorService.showMessenger(moduleScope.NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
      moduleScope.apply();
      // GraphLayerService.setNodeAsTrailend(node);
      // GraphLayerService.applyVisualChanges();
      InstructorService.clearMessenger();
      RouteDialogService.showDialog(node);
    }

    function _onOriginNodeSelected(event, node) {
      GraphLayerService.lockPreviousNodeOf(node);
      GraphLayerService.setNodeAsTrailhead(node);
      GraphLayerService.applyVisualChanges();
      InstructorService.showMessenger(moduleScope.NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
      moduleScope.apply();
    }

    function _onOriginNodeUnselected(event, node) {
      GraphLayerService.releasePreviousNodesOf(node);
      GraphLayerService.clearNode(node);
      GraphLayerService.applyVisualChanges();
      InstructorService.showMessenger(moduleScope.NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
      moduleScope.apply();
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }

    function _onDestinationNodeSelected(event, node) {
      GraphLayerService.setNodeAsTrailend(node);
      GraphLayerService.applyVisualChanges();
      InstructorService.clearMessenger();
      RouteDialogService.showDialog(node[0], node[1]);
    }

    function _onDestinationNodeUnselected(event, node) {
      GraphLayerService.clearNode(node);
      GraphLayerService.applyVisualChanges();
      InstructorService.showMessenger(moduleScope.NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
      moduleScope.emit(moduleScope.NBEVENTS.RELOAD_MAP_DATA);
    }

    function _onRouteDeleted(event) {
      RouteDialogService.closeDialog();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_OFF);
      moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_UPDATED);
    }

    function _onRouteBuildSaved(event) {
      RouteDialogService.closeDialog();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_OFF);
      moduleScope.emit(moduleScope.NBEVENTS.NAVIGATION_UPDATED);
    }

    function _onRouteBuildCanceled(event) {
      RouteDialogService.closeDialog();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_OFF);
    }
  }
})();
