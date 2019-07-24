describe('LoginController_Suite', function () {

  var ctrl;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function ($controller, _$injector_, $rootScope) {

      Injections.$scope = $rootScope.$new();
      Injections.$mdDialog = _$injector_.get('$mdDialog');
      Injections.$mdToast = _$injector_.get('$mdToast');
      Injections.$location = _$injector_.get('$location');
      Injections.$anchorScroll = _$injector_.get('$anchorScroll');
      Injections.StaticVariableService = _$injector_.get('resources.business.StaticVariableService');

      ctrl = $controller('studioStaticVariableCtrl', Injections);

      spyOn(Injections.StaticVariableService, "createStructureToStaticVariable").and.returnValue([]);
      spyOn(Injections.StaticVariableService, 'getStaticVariableList').and.returnValue([]);
    });
  });

  describe('basci unit test', function () {

    it('controllerExistence check', function () {
      expect(ctrl).toBeDefined();
    });

    it('controllerMethodsExistence check', function () {
      expect(ctrl.isCustomize).toBeDefined();
      expect(ctrl.addCustom).toBeDefined();
      expect(ctrl.removeCustom).toBeDefined();
      expect(ctrl.saveVariable).toBeDefined();
      expect(ctrl.cancel).toBeDefined();
      expect(ctrl.variablesListIsEmpty).toBeDefined();
      expect(ctrl.editVariable).toBeDefined();
      expect(ctrl.removeVariable).toBeDefined();
      expect(ctrl.removeCustomFields).toBeDefined();
    });

  });

  describe('isCustomize method', function () {
    beforeEach(function () {
      ctrl.$onInit();
    });

    it('should return false when does not custom', function () {
      console.log(ctrl.variable);
    });

    it('should return true when does not custom', function () {

    });
  });

  describe('addCustom method', function () {
    it('should call addCustomization method', function () {

    });

    it('when method is called the fields should are clean', function () {

    });
  });

  describe('saveVariable method', function () {
    it('when does not edition then call createVariable method', function () {

    });

    it('when is edition then call updateVariable method', function () {

    });
  });

});
