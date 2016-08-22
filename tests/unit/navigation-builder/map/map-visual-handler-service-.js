describe('otusNavigationMap', function() {

  var Mock = {}
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    mockMapView();

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.studio.navigationBuilder.MapVisualHandlerService', injections);
    });
  });

  describe('loadMapView method', function() {

    it('should keep a reference to map view', function() {
      service.loadMapView(Mock.mapView);

      expect(service.mapView()).not.toBe(null);
      expect(service.mapView()).toBeDefined();
    });

  });

  describe('loadMapData method', function() {

    it('should keep a reference to map view', function() {
      service.loadMapView(Mock.mapView);
      
      service.loadMapData(Mock.mapView.graph.nodes(), Mock.mapView.graph.edges());

      expect(Mock.mapView.graph.read).toHaveBeenCalled();
    });

  });

  describe('lockPreviousNodesOf method', function() {

    beforeEach(function() {
      service.loadMapView(Mock.mapView);
    });

    it('should change color to #CCC of all previous nodes of node parameter', function() {
      service.lockPreviousNodesOf(Mock.mapView.graph.nodes(1));

      var changedNode = Mock.mapView.graph.nodes(0);

      expect(changedNode.color).toEqual('#CCC');
    });

    it('should not change color of node parameter', function() {
      service.lockPreviousNodesOf(Mock.mapView.graph.nodes(1));

      var parameterNode = Mock.mapView.graph.nodes(1);

      expect(parameterNode.color).toEqual('#000');
    });

    it('should set isDisabled to true for all previous nodes of node parameter', function() {
      service.lockPreviousNodesOf(Mock.mapView.graph.nodes(1));

      var changedNode = Mock.mapView.graph.nodes(0);

      expect(changedNode.isDisabled).toBeTruthy();
    });

    it('should not set isDisabled to true for node parameter', function() {
      service.lockPreviousNodesOf(Mock.mapView.graph.nodes(1));

      var parameterNode = Mock.mapView.graph.nodes(1);

      expect(parameterNode.isDisabled).toBeFalsy();
    });

  });

  describe('releasePreviousNodesOf method', function() {

    beforeEach(function() {
      service.loadMapView(Mock.mapView);
      service.lockPreviousNodesOf(Mock.mapView.graph.nodes(1));
    });

    it('should change color to #000 of all previous nodes of node parameter', function() {
      service.releasePreviousNodesOf(Mock.mapView.graph.nodes(1));

      var changedNode = Mock.mapView.graph.nodes(0);

      expect(changedNode.color).toEqual('#000');
    });

    it('should not change color of node parameter', function() {
      service.releasePreviousNodesOf(Mock.mapView.graph.nodes(1));

      var parameterNode = Mock.mapView.graph.nodes(1);

      expect(parameterNode.color).toEqual('#000');
    });

    it('should set isDisabled to false for all previous nodes of node parameter', function() {
      service.releasePreviousNodesOf(Mock.mapView.graph.nodes(1));

      var changedNode = Mock.mapView.graph.nodes(0);

      expect(changedNode.isDisabled).toBeTruthy();
    });

  });

  describe('drawMap method', function() {

    it('should call mapView.refresh', function() {
      service.loadMapView(Mock.mapView);

      service.drawMap();

      expect(Mock.mapView.refresh).toHaveBeenCalled();
    });

  });

  describe('clearMap method', function() {

    it('should call mapView.refresh', function() {
      service.loadMapView(Mock.mapView);

      service.clearMap();

      expect(Mock.mapView.graph.clear).toHaveBeenCalled();
    });

  });

  describe('markOriginRouteNode method', function() {

    it('should change color of node', function() {
      var nodeToMark = Mock.mapView.graph.nodes(1);

      service.markOriginRouteNode(nodeToMark);

      expect(nodeToMark.color).toEqual('#00F');
    });

  });

  describe('markDestinationRouteNode method', function() {

    it('should change color of node', function() {
      var nodeToMark = Mock.mapView.graph.nodes(3);

      service.markDestinationRouteNode(nodeToMark);

      expect(nodeToMark.color).toEqual('#F00');
    });

  });

  describe('unmarkNode method', function() {

    it('should change color of node to default value', function() {
      var nodeToMark = Mock.mapView.graph.nodes(1);

      service.unmarkNode(nodeToMark);

      expect(nodeToMark.color).toEqual('#000');
    });

  });

  function mockMapView() {
    // MapView data
    var nodes = [{
      id: 'N1',
      label: 'NODE 1',
      x: 0,
      y: 0,
      size: 10,
      color: '#000'
    }, {
      id: 'N2',
      label: 'NODE 2',
      x: 1,
      y: 0,
      size: 10,
      color: '#000'
    }, {
      id: 'N3',
      label: 'NODE 3',
      x: 2,
      y: 0,
      size: 10,
      color: '#000'
    }, {
      id: 'N4',
      label: 'NODE 4',
      x: 3,
      y: 0,
      size: 10,
      color: '#000'
    }];
    var edges = [{
      id: 'E1',
      source: 'N1',
      target: 'N2'
    }, {
      id: 'E2',
      source: 'N2',
      target: 'N3'
    }, {
      id: 'E3',
      source: 'N3',
      target: 'N4'
    }];

    // MapView mock
    Mock.mapView = {};
    Mock.mapView.refresh = jasmine.createSpy('refresh');
    Mock.mapView.graph = {};
    Mock.mapView.graph.clear = jasmine.createSpy('clear');
    Mock.mapView.graph.read = jasmine.createSpy('read');
    Mock.mapView.graph.nodes = function(index) {
      if (index || index === 0) {
        return nodes[index];
      } else {
        return nodes;
      }
    };
    Mock.mapView.graph.edges = function(index) {
      if (index || index === 0) {
        return edges[index];
      } else {
        return edges;
      }
    };
  }

});
