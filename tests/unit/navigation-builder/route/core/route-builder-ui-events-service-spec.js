describe('UiEventsService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_) {
      mockMapVisualHandlerService(_$injector_);
      mockMapEventsHandlerService(_$injector_);
      mockDataService(_$injector_);

      service = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.UiEventsService', injections);
    });
  });

  describe('activate method', function() {

    beforeEach(function() {
      service.activate();
    });

    it('should call MapVisualHandlerService.mapView', function() {
      expect(Mock.MapVisualHandlerService.mapView).toHaveBeenCalled();
    });

    it('should call MapEventsHandlerService.loadMapView', function() {
      expect(Mock.MapEventsHandlerService.loadMapView).toHaveBeenCalled();
    });

    it('should call MapEventsHandlerService.onClickNode', function() {
      expect(Mock.MapEventsHandlerService.onClickNode).toHaveBeenCalled();
    });

  });

  function mockMapVisualHandlerService($injector) {
    Mock.MapVisualHandlerService = $injector.get('otusjs.studio.navigationBuilder.MapVisualHandlerService');
    injections.MapVisualHandlerService = Mock.MapVisualHandlerService;
    spyOn(Mock.MapVisualHandlerService, 'mapView');
  }

  function mockMapEventsHandlerService($injector) {
    Mock.MapEventsHandlerService = $injector.get('otusjs.studio.navigationBuilder.MapEventsHandlerService');
    injections.MapEventsHandlerService = Mock.MapEventsHandlerService;
    spyOn(Mock.MapEventsHandlerService, 'loadMapView');
    spyOn(Mock.MapEventsHandlerService, 'onClickNode');
  }

  function mockDataService($injector) {
    Mock.DataService = $injector.get('otusjs.studio.navigationBuilder.routeBuilder.DataService');
    injections.DataService = Mock.DataService;
    spyOn(Mock.DataService, 'selectNode');
  }

});
