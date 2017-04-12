describe('UiEventsService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_) {
      mockGraphLayerService(_$injector_);
      mockDataService(_$injector_);

      service = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.UiEventsService', injections);
    });
  });

  describe('activate method', function() {

    beforeEach(function() {
      service.activate();
    });

    xit('should call GraphLayerService.mapView', function() {
      expect(Mock.GraphLayerService.mapView).toHaveBeenCalled();
    });

  });

  function mockMapGraphLayerService($injector) {
    Mock.GraphLayerService = $injector.get('otusjs.studio.navigationBuilder.GraphLayerService');
    injections.GraphLayerService = Mock.GraphLayerService;
    spyOn(Mock.GraphLayerService, 'initialize');
    spyOn(Mock.GraphLayerService, 'lockPreviousNodeOf');
    spyOn(Mock.GraphLayerService, 'releasePreviousNodesOf');
    spyOn(Mock.GraphLayerService, 'setNodeAsPathStart');
    spyOn(Mock.GraphLayerService, 'clearNode');
    spyOn(Mock.GraphLayerService, 'applyVisualChanges');
  }

  function mockDataService($injector) {
    Mock.DataService = $injector.get('otusjs.studio.navigationBuilder.routeBuilder.DataService');
    injections.DataService = Mock.DataService;
    spyOn(Mock.DataService, 'selectNode');
  }

});
