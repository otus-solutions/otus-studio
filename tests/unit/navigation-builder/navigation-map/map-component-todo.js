describe('otusNavigationMap', function() {

  var Mock = {}
  var component = {};
  var injections = {};
  var bindings = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$componentController_, $rootScope, _$injector_, $mdDialog) {
      injections.$scope = mockScope($rootScope);
      injections.NBEVENTS = null;
      injections.NavigationBuilderService = mockNavigationBuilderService(_$injector_);
      injections.NavigationDataDialogService = mockNavigationDataDialogService(_$injector_, $mdDialog);

      component = _$componentController_('otusNavigationMap', injections, bindings);
    });
  });

  describe('', function() {

    it('e', function() {
      conosle.log(component);
    });

  });

  function mockScope($rootScope) {
    Mock.scope = $rootScope.$new();
    return Mock.scope;
  }

  function mockNavigationBuilderService($injector) {
    Mock.NavigationBuilderService = $injector.get('otusjs.studio.navigationBuilder.NavigationBuilderService');
    return Mock.NavigationBuilderService;
  }

  function mockNavigationDataDialogService($injector, $mdDialog) {
    Mock.NavigationDataDialogService = $injector.get('otusjs.studio.navigationBuilder.NavigationDataDialogService', {
      $mdDialog: $mdDialog,
      NavigationBuilderService: Mock.NavigationBuilderService
    });
    return Mock.NavigationDataDialogService;
  }

});
