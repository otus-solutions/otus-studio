describe('NavigationModelAdpterService', function() {

  var Mock = {};
  var service = {};
  var injections = {};

  beforeEach(function() {
    module('studio');

    inject(function(_$injector_) {
      mockNavigationApiService(_$injector_);

      service = _$injector_.get('otusjs.studio.navigationBuilder.NavigationModelClientService', injections);
    });
  });

  describe('addRouteCondition method', function() {

    it('should call NavigationApiService.addRouteCondition', function() {
      service.addRouteCondition();

      expect(Mock.NavigationApiService.addRouteCondition).toHaveBeenCalled();
    });

  });

  function mockNavigationApiService($injector) {
    Mock.NavigationApiService = $injector.get('otusjs.model.navigation.NavigationApiService');
    injections.NavigationApiService = Mock.NavigationApiService;
    spyOn(Mock.NavigationApiService, 'addRouteCondition');
  }

});
