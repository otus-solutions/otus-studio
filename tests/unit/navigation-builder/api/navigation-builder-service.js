describe('NavigationBuilderService', function() {

  var Mock = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    mockTemplateNavigations();
    mockNodes();
    mockEdges();

    inject(function(_$injector_, $rootScope) {
      mockScope($rootScope, _$injector_);

      service = _$injector_.get('otusjs.studio.navigationBuilder.NavigationBuilderService', {
        MapFactory: mockMapFactory(_$injector_),
        RouteBuilderService: mockRouteBuilderService(_$injector_)
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

  describe('activateRouteCreatorMode method', function() {

    it('should call RouteBuilderService.setScope', function() {
      spyOn(Mock.RouteBuilderService, 'setScope');

      service.activateRouteCreatorMode(Mock.scope);

      expect(Mock.RouteBuilderService.setScope).toHaveBeenCalledWith(Mock.scope);
    });

    it('should call scope.$emit with mode activation event', function() {
      spyOn(Mock.scope, '$emit');

      service.activateRouteCreatorMode(Mock.scope);

      expect(Mock.scope.$emit).toHaveBeenCalledWith(Mock.scope.events.ROUTE_SERVICE_MODE_ACTIVE);
    });

  });

  describe('selectNode method', function() {

    describe('when route creator mode is active', function() {

      beforeEach(function() {
        service.activateRouteCreatorMode(Mock.scope);
      });

      it('should delegate work to RouteBuilderService', function() {
        spyOn(Mock.RouteBuilderService, 'selectNode');

        service.selectNode(Mock.nodes[0]);

        expect(Mock.RouteBuilderService.selectNode).toHaveBeenCalledWith(Mock.nodes[0]);
      });

    })

  });

  describe('selectedNode method', function() {

    describe('when route creator mode is active', function() {

      beforeEach(function() {
        service.activateRouteCreatorMode(Mock.scope);
      });

      it('should call RouteBuilderService.selectedNode', function() {
        spyOn(Mock.RouteBuilderService, 'selectedNode');

        service.selectedNode();

        expect(Mock.RouteBuilderService.selectedNode).toHaveBeenCalled();
      });

    })

  });

  describe('selectedNavigation method', function() {

    describe('when route creator mode is active', function() {

      beforeEach(function() {
        service.activateRouteCreatorMode(Mock.scope);
      });

      it('should call RouteBuilderService.selectedNavigation', function() {
        spyOn(Mock.RouteBuilderService, 'selectedNavigation');

        service.selectedNavigation();

        expect(Mock.RouteBuilderService.selectedNavigation).toHaveBeenCalled();
      });

    })

  });

  describe('selectedNodeFamily method', function() {

    describe('when route creator mode is active', function() {

      beforeEach(function() {
        service.activateRouteCreatorMode(Mock.scope);
      });

      it('should call RouteBuilderService.selectedNodeFamily', function() {
        spyOn(Mock.RouteBuilderService, 'selectedNodeFamily');

        service.selectedNodeFamily();

        expect(Mock.RouteBuilderService.selectedNodeFamily).toHaveBeenCalled();
      });

    })

  });

  describe('selectedEdges method', function() {

    describe('when route creator mode is active', function() {

      beforeEach(function() {
        service.activateRouteCreatorMode(Mock.scope);
      });

      it('should call RouteBuilderService.selectedEdges', function() {
        spyOn(Mock.RouteBuilderService, 'selectedEdges');

        service.selectedEdges();

        expect(Mock.RouteBuilderService.selectedEdges).toHaveBeenCalled();
      });

    })

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

  function mockScope($rootScope, $injector) {
    Mock.scope = $rootScope.$new();
    Mock.scope.events = $injector.get('NBEVENTS');
  }

  function mockRouteBuilderService($injector) {
    Mock.RouteBuilderService = $injector.get('otusjs.studio.navigationBuilder.RouteBuilderService');
    return Mock.RouteBuilderService;
  }

});
