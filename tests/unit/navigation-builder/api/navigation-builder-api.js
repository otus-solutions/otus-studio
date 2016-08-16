describe('NavigationBuilderAPI', function() {

  var Mock = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.studio.navigationBuilder.NavigationBuilderAPI', {
        NBEVENTS: _$injector_.get('NBEVENTS'),
        NavigationBuilderService: mockMockNavigationBuilderService(_$injector_)
      });
    });
  });

  describe('loadData method', function() {

    it('should call NavigationBuilderService.loadData', function() {
      spyOn(Mock.NavigationBuilderService, 'loadData');

      service.loadData();

      expect(Mock.NavigationBuilderService.loadData).toHaveBeenCalled();
    });

  });

  function mockMockNavigationBuilderService($injector) {
    Mock.NavigationBuilderService = $injector.get('otusjs.studio.navigationBuilder.NavigationBuilderService');
    return Mock.NavigationBuilderService;
  }

});
