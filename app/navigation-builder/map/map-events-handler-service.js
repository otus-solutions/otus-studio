(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.MapEventsHandlerService', service);

  function service() {
    var self = this;

    const CLICK_NODE = 'clickNode';

    var _mapView = null;
    var _clickNodeListeners = [];

    /* Public methods */
    self.loadMapView = loadMapView;
    self.mapView = mapView;
    self.onClickNode = onClickNode;
    self.clearAllEventListeners = clearAllEventListeners;

    function loadMapView(mapView) {
      _mapView = mapView;
      _initializeEventListeners();
    }

    function mapView() {
      return _mapView;
    }

    function onClickNode(listener) {
      _clickNodeListeners = [];
      _clickNodeListeners.push(listener);
    }

    function clearAllEventListeners() {
      _clickNodeListeners = [];
      _mapView.unbind(CLICK_NODE);
    }

    function _initializeEventListeners() {
      _mapView.bind(CLICK_NODE, function(event) {
        _clickNodeListeners.forEach(function(listener) {
          listener(event);
        })
      });
    }
  }
})();
