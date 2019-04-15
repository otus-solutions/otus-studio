describe('otusNavigationMap', function () {

  var UNIT_NAME = 'otusNavigationMapCtrl';
  var Mock = {};
  var Injections = {};
  var controller = {};

  beforeEach(function () {
    mockInjections();
    angular.mock.module('studio', function ($provide) {
      $provide.value('otusjs.studio.navigationBuilder.NavigationBuilderService', Mock.NavigationBuilderService);
    });

    inject(function (_$injector_, _$controller_) {
      Injections = {
        "NavigationBuilderScopeService": _$injector_.get('otusjs.studio.navigationBuilder.NavigationBuilderScopeService'),
        "GraphLayerService": _$injector_.get('otusjs.studio.navigationBuilder.GraphLayerService'),
      };

      controller = _$controller_(UNIT_NAME, Injections);
    });
  });

  describe('editRoutePriority method', function () {

    beforeEach(function () {
      controller.$onInit();
      spyOn(Mock.NavigationBuilderService, "editRoutePriorityState").and.callThrough();
    });

    it('should to be definition', function () {

      expect(controller.toolsCtrl.editRoutePriority).toBeDefined();
    });

    it('should definition properties with values expected', function () {
      controller.toolsCtrl.editRoutePriority();

      expect(controller.toolsCtrl.modificationButtonRoutePriority).toEqual(true);
      expect(controller.toolsCtrl.modificationButtonInspect).toEqual(false);
    });

    it('should call method editRoutePriorityState', function () {
      controller.toolsCtrl.editRoutePriority();

      expect(Mock.NavigationBuilderService.editRoutePriorityState).toHaveBeenCalledTimes(1);
    });

  });

  function mockInjections() {
    Mock.NavigationBuilderService = {
      editRoutePriorityState: function () {
        return Promise.resolve();
      }
    }
  }

});
