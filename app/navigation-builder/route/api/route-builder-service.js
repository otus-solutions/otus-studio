(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.routeBuilder.DataService',
    'otusjs.studio.navigationBuilder.routeBuilder.EventsService',
    'otusjs.studio.navigationBuilder.routeBuilder.UiEventsService'
  ];

  function service(DataService, EventsService, UiEventsService) {
    var self = this;
    var _scope = null;

    /* Public methods */
    self.activate = activate;
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;
    self.selectedNavigation = selectedNavigation;
    self.selectedNodeFamily = selectedNodeFamily;
    self.selectedEdges = selectedEdges;
    self.deactivate = deactivate;

    function activate(scope) {
      _scope = scope;
      DataService.activate(scope);
      EventsService.activate(scope);
      UiEventsService.activate(scope);
    }

    function selectNode(node) {
      DataService.selectNode(node);
    }

    function selectedNode() {
      return DataService.selectedNode();
    }

    function selectedNavigation() {
      return DataService.selectedNavigation();
    }

    function selectedNodeFamily() {
      return DataService.selectedNodeFamily();
    }

    function selectedEdges() {
      return DataService.selectedEdges();
    }

    function deactivate() {
      DataService.deactivate();
    }
  }
})();
