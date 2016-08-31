(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.EventsService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.MapVisualHandlerService',
    'otusjs.studio.navigationBuilder.MapEventsHandlerService',
    'otusjs.studio.navigationBuilder.messenger.InstructorService',
    'otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService'
  ];

  function service(scopeService, MapVisualHandlerService, MapEventsHandlerService, InstructorService, RouteDialogService) {
    var self = this;
    var _events = [];

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    function activate() {
      var event = scopeService.onEvent(scopeService.NBEVENTS.ORIGIN_NODE_SELECTED, function(event, selectedNode) {
        MapVisualHandlerService.lockPreviousNodesOf(selectedNode);
        MapVisualHandlerService.markOriginRouteNode(selectedNode);
        MapVisualHandlerService.drawMap();
        InstructorService.showMessenger(scopeService.NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
        scopeService.digest();
      });
      _events.push(event);

      event = scopeService.onEvent(scopeService.NBEVENTS.ORIGIN_NODE_UNSELECTED, function(event, selectedNode) {
        MapVisualHandlerService.releasePreviousNodesOf(selectedNode);
        MapVisualHandlerService.unmarkNode(selectedNode);
        MapVisualHandlerService.drawMap();
        InstructorService.showMessenger(scopeService.NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
        scopeService.digest();
      });
      _events.push(event);

      event = scopeService.onEvent(scopeService.NBEVENTS.DESTINATION_NODE_SELECTED, function(event, selectedNode) {
        MapVisualHandlerService.markDestinationRouteNode(selectedNode);
        MapVisualHandlerService.drawMap();
        InstructorService.clearMessenger();
        RouteDialogService.showDialog(selectedNode[0], selectedNode[1]);
        scopeService.digest();
      });
      _events.push(event);

      event = scopeService.onEvent(scopeService.NBEVENTS.DESTINATION_NODE_UNSELECTED, function(event, selectedNode) {
        MapVisualHandlerService.unmarkNode(selectedNode);
        MapVisualHandlerService.drawMap();
        InstructorService.showMessenger(scopeService.NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
        scopeService.digest();
      });
      _events.push(event);

      event = scopeService.onEvent(scopeService.NBEVENTS.ROUTE_BUILD_SAVED, function(event) {
        MapVisualHandlerService.clearSelections();
        InstructorService.clearMessenger();
        RouteDialogService.closeDialog();
        scopeService.emit(scopeService.NBEVENTS.MODULE_MODE_OFF);
      });
      _events.push(event);

      event = scopeService.onEvent(scopeService.NBEVENTS.ROUTE_BUILD_CANCELED, function(event) {
        MapVisualHandlerService.clearSelections();
        InstructorService.clearMessenger();
        RouteDialogService.closeDialog();
        scopeService.emit(scopeService.NBEVENTS.MODULE_MODE_OFF);
      });
      _events.push(event);

      InstructorService.showMessenger(scopeService.NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
    }

    function deactivate() {
      _events.forEach(function(event) {
        event();
      });
    }
  }
})();
