(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.GraphLayerEventService', service);

  function service() {
    var self = this;

    var CLICK_NODE = 'clickNode';
    var OVER_NODE = 'overNode';
    var CLICK_EDGE = 'clickEdge';
    var OVER_EDGE = 'overEdge';

    var _mapView = null;
    var _clickNodeListeners = [];
    var _overNodeListeners = [];
    var _clickEdgeListeners = [];
    var _overEdgeListeners = [];

    /* Public methods */
    self.setMapView = setMapView;
    self.onClickNode = onClickNode;
    self.onOverNode = onOverNode;
    self.onClickEdge = onClickEdge;
    self.onOverEdge = onOverEdge;
    self.clearAllEventListeners = clearAllEventListeners;

    function setMapView(mapView) {
      _mapView = mapView;
      _initializeEventListeners();
    }

    function clearAllEventListeners() {
      _clickNodeListeners = [];
      _overNodeListeners = [];
      _clickEdgeListeners = [];
      _overEdgeListeners = [];
    }

    function onClickNode(listener) {
      _clickNodeListeners = [];
      _clickNodeListeners.push(listener);
    }

    function onOverNode(listener) {
      _overNodeListeners = [];
      _overNodeListeners.push(listener);
    }

    function onClickEdge(listener) {
      _clickEdgeListeners = [];
      _clickEdgeListeners.push(listener);
    }

    function onOverEdge(listener) {
      _overEdgeListeners = [];
      _overEdgeListeners.push(listener);
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

      _mapView.bind(OVER_NODE, function(event) {
        _overNodeListeners.forEach(function(listener) {
          listener(event);
        });
      });

      _mapView.bind(CLICK_EDGE, function(event) {
        _clickEdgeListeners.forEach(function(listener) {
          listener(event);
        });
      });

      _mapView.bind(OVER_EDGE, function(event) {
        _overEdgeListeners.forEach(function(listener) {
          listener(event);
        });
      });
    }
  }
})();
