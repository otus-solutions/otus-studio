(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.GraphLayerEventService', service);

  function service() {
    var self = this;

    var CLICK_NODE = 'clickNode';

    var _mapView = null;
    var _clickNodeListeners = [];

    /* Public methods */
    self.setMapView = setMapView;
    self.onClickNode = onClickNode;
    self.clearAllEventListeners = clearAllEventListeners;

    function setMapView(mapView) {
      _mapView = mapView;
      _initializeEventListeners();
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
        var clickedNode = event.data.node;

        if (!clickedNode.isDisabled) {
          _clickNodeListeners.forEach(function(listener) {
            listener(event);
          })
        }
      });
    }
  }
})();
