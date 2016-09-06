(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.GraphLayerService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.GraphLayerFactory',
    'otusjs.studio.navigationBuilder.GraphLayerEventService'
  ];

  function service(GraphLayerFactory, GraphLayerEventService) {
    var self = this;
    var _graphLayer = {};

    self.eventService = GraphLayerEventService;

    /* Public methods */
    self.initialize = initialize;
    self.lockPreviousNodeOf = lockPreviousNodeOf;
    self.releasePreviousNodesOf = releasePreviousNodesOf;
    self.setNodeAsTrailhead = setNodeAsTrailhead;
    self.setNodeAsTrailend = setNodeAsTrailend;
    self.setNodeAsInspected = setNodeAsInspected;
    self.clearNode = clearNode;
    self.applyVisualChanges = applyVisualChanges;
    self.clearVisualChanges = clearVisualChanges;
    self.showOutputs = showOutputs;
    self.showInputs = showInputs;
    self.lockUnrelated = lockUnrelated;

    function initialize() {
      _graphLayer = GraphLayerFactory.create('map-view');

      self.loadData = _graphLayer.loadData;
      self.render = _graphLayer.render;

      GraphLayerEventService.setMapView(_graphLayer.mapView());
    }

    function lockPreviousNodeOf(node) {
      var style = { color: '#CCC', isDisabled: true };
      _graphLayer.updateNodeStyleBefore(style, node);
    }

    function releasePreviousNodesOf(node) {
      var style = { color: '#313131', isDisabled: false };
      _graphLayer.updateNodeStyleBefore(style, node);
    }

    function setNodeAsTrailhead(node) {
      var style = { color: '#3D855B' };
      _graphLayer.updateNodeStyle(style, node);
    }

    function setNodeAsInspected(node) {
      var style = { color: '#FFD22E' };
      _graphLayer.updateNodeStyle(style, node);
    }

    function setNodeAsTrailend(node) {
      var style = { color: '#1B5BD1' };
      _graphLayer.updateNodeStyle(style, node);
    }

    function clearNode(node) {
      var style = { color: '#313131', isDisabled: false };
      _graphLayer.updateNodeStyle(style, node);
    }

    function clearVisualChanges() {
      var style = { color: '#313131', isDisabled: false };
      _graphLayer.updateAllNodesStyle(style);
      _graphLayer.updateAllEdgesStyle(style);
    }

    function applyVisualChanges() {
      _graphLayer.render();
    }

    function showOutputs(node) {
      var style = { color: '#FF3232' };
      _graphLayer.updateOutputs(style, node);
    }

    function showInputs(node) {
      var style = { color: '#249C26' };
      _graphLayer.updateInputs(style, node);
    }

    function lockUnrelated(node) {
      var style = { color: '#CCC' };
      _graphLayer.updateAllNodesStyle(style);
      _graphLayer.updateAllEdgesStyle(style);
    }
  }
})();
