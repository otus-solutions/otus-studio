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

      spyOn(Injections.StaticVariableService, "createStructureToStaticVariable").and.returnValue(mockData());
      spyOn(Injections.StaticVariableService, 'getStaticVariableList').and.returnValue([mockData()]);
      spyOn(Injections.StaticVariableService, "createVariable");
      spyOn(Injections.StaticVariableService, "updateVariable");
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

    it('should return true when does not custom', function () {
      expect(ctrl.variable.customized).toBe(true);
    });
  });

  describe('addCustom method', function () {

    beforeEach(function () {
      ctrl.$onInit();
      ctrl.customization = { value: "1", label: "Sim" };
      spyOn(ctrl.variable, "addCustomization");
    });

    it('should call addCustomization method', function () {
      ctrl.addCustom();

      expect(ctrl.variable.addCustomization).toHaveBeenCalledTimes(1);
    });

  });

  describe('saveVariable method', function () {

    beforeEach(function () {
      ctrl.$onInit();
    });

    it('when does not edition then call createVariable method', function () {
      ctrl.saveVariable();

      expect(Injections.StaticVariableService.createVariable).toHaveBeenCalledTimes(1);
    });

    it('when is edition then call updateVariable method', function () {
      ctrl.editVariable(0);
      ctrl.saveVariable();

      expect(Injections.StaticVariableService.updateVariable).toHaveBeenCalledTimes(1);
    });
  });


  function mockData() {
    return {
      label: "Participante com diabetes:",
      name: "CSJ10",
      sending: "1",
      customized: true,
      customizations: [
        { value: "1", label: "Sim" },
        { value: "0", label: "Não" }
      ],
      addCustomization: function () { }
    };
  }

});
