(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.UiEventsService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.MapVisualHandlerService',
    'otusjs.studio.navigationBuilder.MapEventsHandlerService',
    'otusjs.studio.navigationBuilder.routeBuilder.DataService'
  ];

  function service(MapVisualHandlerService, MapEventsHandlerService, DataService) {
    var self = this;
    var _originNode = null;
    var _destinationNode = null;
    var _scope = null;

    /* Public methods */
    self.activate = activate;

    function activate(scope) {
      _scope = scope;
      MapEventsHandlerService.loadMapView(MapVisualHandlerService.mapView());
      MapEventsHandlerService.onClickNode(function(event) {
        var clickedNode = event.data.node;

        if (!clickedNode.isDisabled) {
          DataService.selectNode(event.data.node);
        };
      });
    }
  }
})();
