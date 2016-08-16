(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMap', {
      template: `<div id="map-view" style="width: 100%; height: 100%"></div>`,
      controller: component
    });

  component.$inject = [
    '$scope',
    'NBEVENTS',
    'otusjs.studio.navigationBuilder.NavigationBuilderService',
    'otusjs.studio.navigationBuilder.NavigationDataDialogService'
  ];

  function component($scope, NBEVENTS, NavigationBuilderService, NavigationDataDialogService) {
    var self = this;

    /* Component cicle methods */
    self.$onInit = onInit;

    /* Public properties */
    self.mapView = null;

    function onInit() {
      $scope.$parent.$parent.$on(NBEVENTS.MAP_CONTAINER_READY, function(event, data) {
        setupMapView();
        renderMap();
        attachEvents();
      });
    }

    function setupMapView() {
      clearMapView();
      self.mapView = new sigma('map-view');
    }

    function renderMap() {
      self.mapView.graph.read({
        nodes: NavigationBuilderService.nodes(),
        edges: NavigationBuilderService.edges()
      });
      self.mapView.refresh();
    }

    function clearMapView() {
      if (self.mapView) {
        self.mapView.graph.clear();
        $('#map-view').empty();
      }
    }

    function attachEvents() {
      self.mapView.bind('clickNode', function(event) {
        NavigationDataDialogService.showDialog(event.data.node);
      });
    }
  }
})();
