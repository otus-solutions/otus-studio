describe('component: otusRuleEditor', function() {

  var ctrl,
    scope,
    $componentController,
    Mock = {};

  beforeEach(module('otusjs.studio.navigationBuilder.routeBuilder'));

  beforeEach(inject(function($rootScope, _$componentController_, _$injector_) {
    scope = $rootScope.$new();
    $componentController = _$componentController_;
    Mock.RouteBuilderService = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService');
  }));

  describe('answerChange method', function() {
    it('should called method updateRule', function() {
      var ctrl = $componentController('otusRuleEditor', null, Mock.RouteBuilderService);

      //ctrl.answerChange();

      //  expect(service.updateRule).toHaveBeenCalled();
    });
  });

});
