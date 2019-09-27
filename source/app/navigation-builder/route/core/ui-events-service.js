(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.UiEventsService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.GraphLayerService',
    'otusjs.studio.navigationBuilder.routeBuilder.DataService'
  ];

  function service(moduleScope, GraphLayerService, DataService) {
    var self = this;

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    function activate() {
      GraphLayerService.eventService.onClickNode(_selectNode);
      GraphLayerService.eventService.onOverNode(_focusNode);
      GraphLayerService.eventService.onClickEdge(_selectRoute);
      GraphLayerService.eventService.onOverEdge(_focusEdge);
    }

    function deactivate() {
      GraphLayerService.eventService.clearAllEventListeners();
    }

    function _selectNode(event) {
      DataService.selectNode(event.data.node);
    }

    function _focusNode(event) {
    }

    function _selectRoute(event) {
      var map = moduleScope.get('map');
      var node = map.nodes([event.data.edge.source]);
      var originNode = event.data.edge.source;
      DataService.selectNode();
    }

    function _focusEdge(event) {
      console.log(event.data.edge);
    }
  }
})();
