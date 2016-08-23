(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .controller('otusjs.studio.navigationBuilder.NavigationBuilderController', controller);

  controller.$inject = [
    '$scope',
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function controller($scope, NavigationBuilderScopeService) {
    var self = this;

    NavigationBuilderScopeService.initialize($scope);

    function _initializeModuleEvents() {
      NavigationBuilderScopeService.onEvent(NBEVENTS.MAP_CONTAINER_READY, function(event, data) {
        MapVisualHandlerService.loadMapView(new sigma('map-view'));
        NavigationMessengerService.setScope($scope);
      });

      NavigationBuilderScopeService.onEvent(NBEVENTS.ROUTE_BUILD_STARTED, function(event, data) {
        NavigationMessengerService.showMessenger(NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
      });

      NavigationBuilderScopeService.onEvent(NBEVENTS.ROUTE_BUILD_CANCELED, function(event, data) {
        NavigationBuilderService.endActiveMode();
        MapVisualHandlerService.clearSelections();
        NavigationMessengerService.clearMessenger();
      });

      NavigationBuilderScopeService.onEvent(NBEVENTS.ORIGIN_NODE_SELECTED, function(event, selectedNode) {
        MapVisualHandlerService.lockPreviousNodesOf(selectedNode);
        MapVisualHandlerService.markOriginRouteNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.showMessenger(NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
        $scope.$digest();
      });

      NavigationBuilderScopeService.onEvent(NBEVENTS.ORIGIN_NODE_UNSELECTED, function(event, selectedNode) {
        MapVisualHandlerService.releasePreviousNodesOf(selectedNode);
        MapVisualHandlerService.unmarkNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.showMessenger(NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
        $scope.$digest();
      });

      NavigationBuilderScopeService.onEvent(NBEVENTS.DESTINATION_NODE_SELECTED, function(event, selectedNode) {
        MapVisualHandlerService.markDestinationRouteNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.clearMessenger();
        $scope.$digest();
      });

      NavigationBuilderScopeService.onEvent(NBEVENTS.DESTINATION_NODE_UNSELECTED, function(event, selectedNode) {
        MapVisualHandlerService.unmarkNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.showMessenger(NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
        $scope.$digest();
      });
    }
  }
}());
