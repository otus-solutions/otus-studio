describe('ModuleEventService', function() {

  var Injections;
  var service = {};

  beforeEach(function () {
    angular.mock.module('otusjs.studio.navigationBuilder');

     angular.mock.module(function ($provide) {
      $provide.value('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService',[] );
      $provide.value('otusjs.studio.navigationBuilder.navigationRoutePriority.NavigationRoutePriorityService', []);
    });

     angular.mock.inject(function (_$injector_) {
       Injections ={
         moduleScope: _$injector_.get('otusjs.studio.navigationBuilder.NavigationBuilderScopeService'),
         GraphLayerService: _$injector_.get('otusjs.studio.navigationBuilder.GraphLayerService'),
         InstructorService: _$injector_.get('otusjs.studio.navigationBuilder.messenger.InstructorService'),
         RoutePriorityDialogService: _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.RoutePriorityDialogService')
       };
       service = _$injector_.get('otusjs.studio.navigationBuilder.navigationRoutePriority.ModuleEventService', Injections);
     });

    spyOn(service, 'activate').and.callThrough();
    spyOn(service, 'deactivate').and.callThrough();
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

   describe('serviceInstance', function() {

    it('showDialogMethodExistence check', function () {
      expect(service.activate).toBeDefined();
      expect(service.deactivate).toBeDefined();
    });

    it('should activate method', function() {
        service.activate();
        expect(service.activate).toHaveBeenCalledTimes(1);
      });

    it('should deactivate method', function() {
        service.deactivate();
        expect(service.deactivate).toHaveBeenCalledTimes(1);
      });
  });
});
