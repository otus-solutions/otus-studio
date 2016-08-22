describe('RouteBuilderService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_, $rootScope) {
      mockNodes();
      mockScope($rootScope, _$injector_);
      mockDataService(_$injector_);
      mockEventsService(_$injector_);
      mockUiEventsService(_$injector_);

      service = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService', injections);
    });
  });

  describe('activate method', function() {
    beforeEach(function() {
      service.activate(Mock.scope);
    });

    it('should call DataService.activate', function() {
      expect(Mock.DataService.activate).toHaveBeenCalled();
    });

    it('should call EventsService.activate', function() {
      expect(Mock.EventsService.activate).toHaveBeenCalled();
    });

    it('should call UiEventsService.activate', function() {
      expect(Mock.UiEventsService.activate).toHaveBeenCalled();
    });

  });

  describe('selectNode method', function() {

    it('should call DataService.selectNode', function() {
      service.selectNode(Mock.n1);

      expect(Mock.DataService.selectNode).toHaveBeenCalled();
    });

  });

  describe('selectedNode method', function() {

    it('should call DataService.selectedNode', function() {
      service.selectedNode();

      expect(Mock.DataService.selectedNode).toHaveBeenCalled();
    });

  });

  describe('selectedNode method', function() {

    it('should call DataService.selectedNavigation', function() {
      service.selectedNavigation();

      expect(Mock.DataService.selectedNavigation).toHaveBeenCalled();
    });

  });

  describe('selectedNodeFamily method', function() {

    it('should call DataService.selectedNodeFamily', function() {
      service.selectedNodeFamily();

      expect(Mock.DataService.selectedNodeFamily).toHaveBeenCalled();
    });

  });

  describe('selectedEdges method', function() {

    it('should call DataService.selectedEdges', function() {
      service.selectedEdges();

      expect(Mock.DataService.selectedEdges).toHaveBeenCalled();
    });

  });

  describe('deactivate method', function() {

    it('should call DataService.deactivate', function() {
      service.deactivate();

      expect(Mock.DataService.deactivate).toHaveBeenCalled();
    });

  });

  function mockScope($rootScope, $injector) {
    Mock.scope = $rootScope.$new();
    Mock.scope.events = $injector.get('NBEVENTS');
    Mock.scope.messages = $injector.get('NBMESSAGES');
  }

  function mockNodes() {
    Mock.n1 = {
      id: 'N1'
    };

    Mock.n2 = {
      id: 'N2'
    };

    Mock.n3 = {
      id: 'N3'
    };
  }

  function mockDataService($injector) {
    Mock.DataService = $injector.get('otusjs.studio.navigationBuilder.routeBuilder.DataService');
    injections.DataService = Mock.DataService;
    spyOn(Mock.DataService, 'activate');
    spyOn(Mock.DataService, 'selectNode');
    spyOn(Mock.DataService, 'selectedNode');
    spyOn(Mock.DataService, 'selectedNavigation');
    spyOn(Mock.DataService, 'selectedNodeFamily');
    spyOn(Mock.DataService, 'selectedEdges');
    spyOn(Mock.DataService, 'deactivate');
  }

  function mockEventsService($injector) {
    Mock.EventsService = $injector.get('otusjs.studio.navigationBuilder.routeBuilder.EventsService');
    injections.EventsService = Mock.EventsService;
    spyOn(Mock.EventsService, 'activate');
  }

  function mockUiEventsService($injector) {
    Mock.UiEventsService = $injector.get('otusjs.studio.navigationBuilder.routeBuilder.UiEventsService');
    injections.UiEventsService = Mock.UiEventsService;
    spyOn(Mock.UiEventsService, 'activate');
  }

});
