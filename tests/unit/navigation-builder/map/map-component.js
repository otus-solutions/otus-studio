describe('otusNavigationMap', function() {

  var Mock = {}
  var component = {};
  var $compile = {};
  var injections = {};
  var bindings = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$componentController_, $rootScope, _$injector_, _$compile_) {
      $compile = _$compile_;
      injections.$scope = mockScope($rootScope);
      injections.NBEVENTS = mockModuleConstants(_$injector_);
      injections.NavigationBuilderService = mockNavigationBuilderService(_$injector_);
      injections.MessageService = mockMessageService(_$injector_);

      component = _$componentController_('otusNavigationMap', injections, bindings);
    });
  });

  describe('onInit method', function() {

    it('should create a routeMenuController within component', function() {
      component.$onInit();

      expect(component.routeMenuCtrl).toBeDefined();
    });

    it('should create a reference to NBEVENTS into $scope', function() {
      component.$onInit();

      expect(Mock.scope.events).toBeDefined();
    });

    it('should create a listener to module events', function() {
      spyOn(Mock.scope, '$on');

      component.$onInit();

      expect(Mock.scope.$on).toHaveBeenCalledTimes(5);
    });

    describe('when NBEVENTS.MAP_CONTAINER_READY is fired', function() {

      // TODO: but how?
      xit('should setup map view', function() {});

    });

  });

  function mockScope($rootScope) {
    Mock.scope = $rootScope.$new();
    Mock.scope.$parent = $rootScope.$new();
    Mock.scope.$parent.$parent = $rootScope.$new();
    return Mock.scope;
  }

  function mockNavigationBuilderService($injector) {
    Mock.NavigationBuilderService = $injector.get('otusjs.studio.navigationBuilder.NavigationBuilderService');
    return Mock.NavigationBuilderService;
  }

  function mockMessageService($injector) {
    Mock.MessageService = $injector.get('otusjs.studio.navigationBuilder.MessageService');
    return Mock.NavigationDataDialogService;
  }

  function mockModuleConstants($injector) {
    Mock.NBEVENTS = $injector.get('NBEVENTS');
    return Mock.NBEVENTS;
  }

});
