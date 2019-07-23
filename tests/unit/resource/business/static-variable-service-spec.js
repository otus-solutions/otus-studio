describe('StaticVariableService Suite', function () {

  var service;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('studio');

    _mockData();

    angular.mock.inject(function (_$injector_) {

      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.AddStaticVariableEventFactory = _$injector_.get('resources.core.AddStaticVariableEventFactory');
      Injections.RemoveStaticVariableEventFactory = _$injector_.get('resources.core.RemoveStaticVariableEventFactory');
      Injections.UpdateStaticVariableEventFactory = _$injector_.get('resources.core.UpdateStaticVariableEventFactory');
      Mock.item = _$injector_.get('SurveyFactory').create('TEST');

      service = _$injector_.get('resources.business.StaticVariableService', Injections);

      spyOn(Injections.WorkspaceService, "getSurvey");
      spyOn(Injections.WorkspaceService, "saveWork");
    });
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  describe('getStaticVariableList mehtod', function () {
    it('Instance of AddStaticVariableEventFactory should evoke internalMethods', function () {
      service.createVariable(Mock.variable);

      expect(Injections.AddStaticVariableEventFactory.execute).toHaveBeenCalledTimes(1);
      expect(Injections.WorkspaceService.saveWork).toHaveBeenCalledTimes(1);
    });
  });

  function _mockData() {
    Mock.variable = {
      name: 'CSJ10',
      description: 'Participante com diabetes:',
      sending: 1,
      customize: true,
      customizations: [
        {
          value: 0,
          label: 'Não'
        },
        {
          value: 1,
          label: 'Sim'
        }
      ]
    };
  }

});
