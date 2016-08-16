(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMinimap', {
      template: `<md-card id="minimap-view" style="width: 100%; height: 80%"></md-card>`,
      controller: component,
      bindings: {
        navigation: '<'
      },
      require: {
        otusNavigationDataPanel: '^'
      }
    });

  component.$inject = [
    '$scope',
    'NBEVENTS',
    'otusjs.studio.navigationBuilder.NavigationBuilderService',
    'otusjs.studio.navigationBuilder.NavigationDataDialogService'
  ];

  function component($scope, NBEVENTS, NavigationBuilderService, NavigationDataDialogService) {
    var self = this;
    var _rootNode = {};

    /* Component cicle methods */
    self.$onInit = onInit;

    /* Public properties */
    self.mapView = null;

    function onInit() {
      setupMapView();
      renderMap();
      attachEvents();
    }

    function setupMapView() {
      clearMapView();
      self.mapView = new sigma('minimap-view');
    }

    function renderMap() {
      var selectedNodeFamily = NavigationBuilderService.selectedNodeFamily();
      _rootNode = selectedNodeFamily[0];

      self.mapView.graph.read({
        nodes: selectedNodeFamily,
        edges: NavigationBuilderService.selectedEdges()
      });
      self.mapView.refresh();
    }

    function clearMapView() {
      if (self.mapView) {
        self.mapView.graph.clear();
        $('#minimap-view').empty();
      }
    }

    function attachEvents() {
      self.mapView.bind('clickNode', function(event) {
        var clickedNode = event.data.node;
        var routeToDetail = _rootNode.navigation.routes.filter(function(route) {
          return route.destination === clickedNode.id;
        });

        self.otusNavigationDataPanel.openRouteDetail(routeToDetail[0]);
      });
    }
  }
})();
