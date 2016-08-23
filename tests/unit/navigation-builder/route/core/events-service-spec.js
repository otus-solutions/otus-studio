describe('UiEventsService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_) {
      mockNavigationMessengerService(_$injector_);
      mockMapVisualHandlerService(_$injector_);
      mockMapEventsHandlerService(_$injector_);
      mockDataService(_$injector_);
      mockRouteDialogService(_$injector_);

      service = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.EventsService', injections);
    });
  });

  describe('activate method', function() {

    beforeEach(function() {
      service.activate(Mock.scope);
    });

    // it('should call NavigationDataDialogService.showDialog', function() {
    //   service.selectNode(Mock.n2);
    //
    //   expect(Mock.RouteDialogService.showDialog).toHaveBeenCalledWith(Mock.n1, Mock.n2, Mock.scope);
    // });

  });

  function mockNavigationMessengerService($injector) {
    Mock.NavigationMessengerService = $injector.get('otusjs.studio.navigationBuilder.NavigationMessengerService');
    injections.NavigationMessengerService = Mock.NavigationMessengerService;
    spyOn(Mock.NavigationMessengerService, 'showMessenger');
    spyOn(Mock.NavigationMessengerService, 'clearMessenger');
  }

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

  function mockRouteDialogService($injector) {
    Mock.RouteDialogService = $injector.get('otusjs.studio.navigationBuilder.routeBuilder.RouteDialogService');
    injections.RouteDialogService = Mock.RouteDialogService;
    spyOn(Mock.RouteDialogService, 'showDialog');
  }

  function mockScope($rootScope, $injector) {
    Mock.scope = $rootScope.$new();
    Mock.scope.events = $injector.get('NBEVENTS');
    Mock.scope.$emit = jasmine.createSpy('$on');
  }

});
