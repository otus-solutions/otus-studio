describe('NavigationRoutePriorityService Suite', function () {

  var Mock = {};
  var service = {};
  var survey = {};

  beforeEach(function () {
    angular.mock.module('otusjs.studio.navigationBuilder', function ($provide) {
      $provide.value('WorkspaceService');
    });

    angular.mock.inject(function (_$injector_) {
      service = _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.NavigationRoutePriorityService');

      Mock.DataService = _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.DataService');
      Mock.UiEventsService = _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.UiEventsService');
      Mock.ModuleEventService = _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.ModuleEventService');
      Mock.moduleScope = _$injector_.get('otusjs.studio.navigationBuilder.NavigationBuilderScopeService');

      spyOn(Mock.DataService, "activate").and.callThrough();
      spyOn(Mock.UiEventsService, "activate").and.callThrough();
      spyOn(Mock.ModuleEventService, "activate").and.callThrough();
      spyOn(Mock.moduleScope, "emit").and.callThrough();
      spyOn(Mock.DataService, "deactivate").and.callThrough();
      spyOn(Mock.UiEventsService, "deactivate").and.callThrough();
      spyOn(Mock.ModuleEventService, "deactivate").and.callThrough();
    });
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence check', function () {
    expect(service.activate).toBeDefined();
    expect(service.deactivate).toBeDefined();
  });

  it('activateMethod_should_evocate_internals_methods ', function () {
    service.activate(survey);
    expect(Mock.DataService.activate).toHaveBeenCalledWith(survey);
    expect(Mock.DataService.activate).toHaveBeenCalledTimes(1);
    expect(Mock.UiEventsService.activate).toHaveBeenCalledTimes(1);
    expect(Mock.ModuleEventService.activate).toHaveBeenCalledTimes(1);
  });

  it('desactiveMethod_should_evocate_internals_methods', function (){
    service.deactivate();
    expect(Mock.moduleScope.emit).toHaveBeenCalledTimes(1);
    expect(Mock.DataService.deactivate).toHaveBeenCalledTimes(1);
    expect(Mock.UiEventsService.deactivate).toHaveBeenCalledTimes(1);
    expect(Mock.ModuleEventService.deactivate).toHaveBeenCalledTimes(1);
  });
});


