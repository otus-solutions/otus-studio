describe('NavigationBuilderService', function() {

  var Mock = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    mockTemplateNavigations();

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
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD5",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD5",
        "destination": "CAD6",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD6",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD6",
        "destination": "CAD7",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD7",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD7",
        "destination": "CAD8",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD8",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD8",
        "destination": "CAD9",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD9",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD9",
        "destination": "CAD11",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD11",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD11",
        "destination": "CAD12",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD12",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD12",
        "destination": "CAD13",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD13",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD13",
        "destination": "CAD14",
        "conditionSet": {}
      }]
    }, {
      "extents": "StudioObject",
      "objectType": "Navigation",
      "origin": "CAD14",
      "routes": [{
        "extents": "StudioObject",
        "objectType": "Route",
        "name": "1",
        "origin": "CAD14",
        "destination": "CAD15",
        "conditionSet": {}
      }]
    }];
  }

});
