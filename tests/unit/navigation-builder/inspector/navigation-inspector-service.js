describe('NavigationBuilderService', function() {

  var Mock = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    mockTemplateNavigations();
    mockNodes();
    mockEdges();

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.studio.navigationBuilder.NavigationBuilderService', {
        MapFactory: mockMapFactory(_$injector_)
      });
    });
  });

  describe('loadTemplateNavigations method', function() {

    it('should initialize a Map', function() {
      service.loadTemplateNavigations(Mock.templateNavigations);

      expect(service.navigationMap()).toBeDefined();
    });

    it('should convert each navigation from template to Nodes', function() {
      service.loadTemplateNavigations(Mock.templateNavigations);

      expect(service.nodes().length).not.toBe(0);
      expect(service.navigationMap().nodes().length).not.toBe(0);
    });

    it('should create edges to each navigation route case', function() {
      service.loadTemplateNavigations(Mock.templateNavigations);

      expect(service.edges().length).not.toBe(0);
      expect(service.navigationMap().edges().length).not.toBe(0);
    });

  });

  describe('selectNode method', function() {

    it('should store a reference to selected node from map', function() {
      service.loadTemplateNavigations(Mock.templateNavigations);
      service.selectNode(Mock.nodes[0]);

      var node = service.selectedNode();

      expect(node.id).toEqual(Mock.nodes[0].id);
    });

  });

  describe('selectedNavigation method', function() {

    it('should return a navigation that corresponds to selected node', function() {
      service.loadTemplateNavigations(Mock.templateNavigations);
      service.selectNode(Mock.nodes[0]);

      var node = service.selectedNode();

      expect(node.navigation.origin).toEqual(Mock.nodes[0].navigation.origin);
    });

  });

  describe('selectedNodeFamily method', function() {

    it('should return the selected node and nodes that are your routes', function() {
      service.loadTemplateNavigations(Mock.templateNavigations);
      service.selectNode(Mock.nodes[0]);

      var nodes = service.selectedNodeFamily();

      expect(nodes[0].id).toEqual(Mock.nodes[0].id);
      expect(nodes[1].id).toEqual(Mock.nodes[1].id);
      expect(nodes.length).toBe(2);
    });

  });

  describe('selectedEdges method', function() {

    it('should return the selected edges that connect the nodes of family', function() {
      service.loadTemplateNavigations(Mock.templateNavigations);
      service.selectNode(Mock.nodes[0]);

      var edges = service.selectedEdges();

      expect(edges[0].id).toEqual(Mock.edges[0].id);
      expect(edges.length).toBe(1);
    });

  });

  function mockMapFactory($injector) {
    Mock.MapFactory = $injector.get('otusjs.studio.navigationBuilder.model.MapFactory');
    return Mock.MapFactory;
  }

  function mockTemplateNavigations() {
    Mock.templateNavigations = [{
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD1",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD1",
        "destination": "CAD2",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD2",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD2",
        "destination": "CAD3",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD3",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD3",
        "destination": "CAD4",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD4",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD4",
        "destination": "CAD5",
        "conditionSet": {}
      }]
    }];
  }

  function mockNodes() {
    Mock.nodes = [{
      id: 'CAD1',
      label: 'CAD1',
      navigation: Mock.templateNavigations[0]
    }, {
      id: 'CAD2',
      label: 'CAD2',
      navigation: Mock.templateNavigations[1]
    }, {
      id: 'CAD3',
      label: 'CAD3',
      navigation: Mock.templateNavigations[2]
    }, {
      id: 'CAD4',
      label: 'CAD4',
      navigation: Mock.templateNavigations[3]
    }];
  }

  function mockEdges() {
    Mock.edges = [{
      id: 'CAD1',
      source: 'CAD1',
      target: 'CAD2'
    }, {
      id: 'CAD2',
      source: 'CAD2',
      target: 'CAD3'
    }, {
      id: 'CAD3',
      source: 'CAD3',
      target: 'CAD4'
    }];
  }

});
