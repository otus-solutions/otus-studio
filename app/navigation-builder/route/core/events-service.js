(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.EventsService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationMessengerService',
    'otusjs.studio.navigationBuilder.MapVisualHandlerService',
    'otusjs.studio.navigationBuilder.MapEventsHandlerService',
    'otusjs.studio.navigationBuilder.routeBuilder.DataService',
    'otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService'
  ];

  function service(NavigationMessengerService, MapVisualHandlerService, MapEventsHandlerService, DataService, RouteDialogService) {
    var self = this;
    var _scope = null;

    /* Public methods */
    self.activate = activate;

    function activate(scope) {
      _scope = scope;

      _scope.$on(_scope.events.ORIGIN_NODE_SELECTED, function(event, selectedNode) {
        MapVisualHandlerService.lockPreviousNodesOf(selectedNode);
        MapVisualHandlerService.markOriginRouteNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.showMessenger(_scope.messages.ROUTE_BUILDER.SELECT_DESTINATION);
        _scope.$digest();
      });

      _scope.$on(_scope.events.ORIGIN_NODE_UNSELECTED, function(event, selectedNode) {
        MapVisualHandlerService.releasePreviousNodesOf(selectedNode);
        MapVisualHandlerService.unmarkNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.showMessenger(_scope.messages.ROUTE_BUILDER.SELECT_ORIGIN);
        _scope.$digest();
      });

      _scope.$on(_scope.events.DESTINATION_NODE_SELECTED, function(event, selectedNode) {
        MapVisualHandlerService.markDestinationRouteNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.clearMessenger();
        RouteDialogService.showDialog(selectedNode[0], selectedNode[1], _scope);
        _scope.$digest();
      });

      _scope.$on(_scope.events.DESTINATION_NODE_UNSELECTED, function(event, selectedNode) {
        MapVisualHandlerService.unmarkNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.showMessenger(_scope.messages.ROUTE_BUILDER.SELECT_DESTINATION);
        _scope.$digest();
      });

      _scope.$on(_scope.events.ROUTE_BUILD_CANCELED, function(event, data) {
        DataService.deactivate();
        MapVisualHandlerService.clearSelections();
        NavigationMessengerService.clearMessenger();
      });

      NavigationMessengerService.showMessenger(_scope.messages.ROUTE_BUILDER.SELECT_ORIGIN);
    }
  }
})();
