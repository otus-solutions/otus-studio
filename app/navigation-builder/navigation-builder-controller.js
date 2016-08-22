(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .controller('otusjs.studio.navigationBuilder.NavigationBuilderController', controller);

  // controller.$inject = [''];

  function controller() {
    var self = this;

    self.NavigationBuilderController = null;


    function _initializeModuleEvents() {
      $scope.events = NBEVENTS;

      $scope.$parent.$parent.$on(NBEVENTS.MAP_CONTAINER_READY, function(event, data) {
        MapVisualHandlerService.loadMapView(new sigma('map-view'));
        _renderMap();
        _bindMapEvents();
        NavigationMessengerService.setScope($scope);
      });

      $scope.$on(NBEVENTS.ROUTE_BUILD_STARTED, function(event, data) {
        NavigationMessengerService.showMessenger(NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
      });

      $scope.$on(NBEVENTS.ROUTE_BUILD_CANCELED, function(event, data) {
        NavigationBuilderService.endActiveMode();
        MapVisualHandlerService.clearSelections();
        NavigationMessengerService.clearMessenger();
      });

      $scope.$on(NBEVENTS.ORIGIN_NODE_SELECTED, function(event, selectedNode) {
        MapVisualHandlerService.lockPreviousNodesOf(selectedNode);
        MapVisualHandlerService.markOriginRouteNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.showMessenger(NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
        $scope.$digest();
      });

      $scope.$on(NBEVENTS.ORIGIN_NODE_UNSELECTED, function(event, selectedNode) {
        MapVisualHandlerService.releasePreviousNodesOf(selectedNode);
        MapVisualHandlerService.unmarkNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.showMessenger(NBMESSAGES.ROUTE_BUILDER.SELECT_ORIGIN);
        $scope.$digest();
      });

      $scope.$on(NBEVENTS.DESTINATION_NODE_SELECTED, function(event, selectedNode) {
        MapVisualHandlerService.markDestinationRouteNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.clearMessenger();
        $scope.$digest();
      });

      $scope.$on(NBEVENTS.DESTINATION_NODE_UNSELECTED, function(event, selectedNode) {
        MapVisualHandlerService.unmarkNode(selectedNode);
        MapVisualHandlerService.drawMap();
        NavigationMessengerService.showMessenger(NBMESSAGES.ROUTE_BUILDER.SELECT_DESTINATION);
        $scope.$digest();
      });
    }
  }
})
