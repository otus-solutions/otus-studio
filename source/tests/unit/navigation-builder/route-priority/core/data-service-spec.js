describe('DataService', function() {

  var Mock = {};
  var service = {};
  var Injections;

  beforeEach(function() {
    angular.mock.module('otusjs.studio.navigationBuilder');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService',[] );
      $provide.value('otusjs.studio.navigationBuilder.navigationRoutePriority.ModuleEventService', []);
      $provide.value('otusjs.studio.navigationBuilder.navigationRoutePriority.NavigationRoutePriorityService', []);
    });

    angular.mock.inject(function (_$injector_) {
      mockNavigationBuilderScopeService(_$injector_);
      Injections ={
        moduleScope: _$injector_.get('otusjs.studio.navigationBuilder.NavigationBuilderScopeService')
      };
      service = _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.DataService', Injections);
    });

    mockSurvey();
    mockNodes();

    spyOn(service, 'activate').and.callThrough();
    spyOn(service, 'deactivate').and.callThrough();
    spyOn(service, 'selectNode').and.callThrough();
    spyOn(service, 'selectedNode').and.callThrough();
    spyOn(Mock.NavigationBuilderScopeService, 'emit').and.callThrough();
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  describe('serviceInstance', function() {
    beforeEach(function() {
      service.selectNode(Mock.n1);
    });

    it('showDialogMethodExistence check', function () {
      expect(service.activate).toBeDefined();
      expect(service.deactivate).toBeDefined();
      expect(service.selectNode).toBeDefined();
      expect(service.selectedNode).toBeDefined();
    });

    it('should activate method', function() {
        service.activate(Mock.survey);
        expect(service.activate).toHaveBeenCalledTimes(1);
      });

    it('should deactivate method', function() {
        service.deactivate();
        expect(service.deactivate).toHaveBeenCalledTimes(1);
      });

    it('should selectNode method', function() {
        expect(service.selectNode).toHaveBeenCalledTimes(1);
        expect(Mock.NavigationBuilderScopeService.emit).toHaveBeenCalledTimes(1);
      });

    it('should selectedNode method', function() {
      expect(service.selectedNode()).toEqual(Mock.n1)
      expect(service.selectedNode).toHaveBeenCalledTimes(1);
    });
  });

  function mockNodes() {
    Mock.n1 = {
      id: 'N1'
    };
  }

  function mockNavigationBuilderScopeService($injector) {
    Mock.NavigationBuilderScopeService = $injector.get(
      'otusjs.studio.navigationBuilder.NavigationBuilderScopeService');
  }

  function mockSurvey() {
    Mock.survey = {};
  }

});
