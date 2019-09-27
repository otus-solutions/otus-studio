describe('UpdateStaticVariableEventFactory', function () {
  var factory;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function (_$injector_) {

      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.WorkspaceService.workspace = mockWorkspace();
      Injections.UpdateStaticVariableTaskService = _$injector_.get('otusjs.staticVariable.UpdateStaticVariableTaskService');

      mockData();
      factory = _$injector_.get('resources.core.UpdateStaticVariableEventFactory', Injections);
      spyOn(Injections.UpdateStaticVariableTaskService, "execute");
      spyOn(Injections.WorkspaceService, "getSurvey");
      spyOn(Injections.WorkspaceService, "saveWork");
    });
  });

  describe('basic suit unit test', function () {
    it('factoryExistence check', function () {
      expect(factory).toBeDefined();
    });

    it('factoryMethodsExistence check', function () {
      expect(factory.create).toBeDefined();
    });

    it('create method should instantiate UpdateStaticVariableEvent', function () {
      expect(factory.create().execute).toBeDefined();
    });
  });

  describe('execute method', function () {
    it('execute method should evoke internalMethods of instance UpdateStaticVariableEvent', function () {
      factory.create().execute(0, Mock.variable);
      expect(Injections.UpdateStaticVariableTaskService.execute).toHaveBeenCalledTimes(1);
      expect(Injections.WorkspaceService.saveWork).toHaveBeenCalledTimes(1);
    });
  });

  function mockWorkspace() {
    return Mock.workspace = {
      isdb: {
        userEdits: {
          store: jasmine.createSpy()
        }
      },
      project: {
        survey: jasmine.createSpy()
      },
      sessions: {
        workspaceOwner: jasmine.createSpy()
      }
    }
  };

  function mockData() {
    Mock.variable = {
      name: 'CSJ10',
      label: 'Participante com diabetes:',
      sending: 1,
      customized: false,
      customizations: [
        {
          value: 1,
          label: 'Sim'
        },
        {
          value: 0,
          label: 'Não'
        }
      ]
    };
  };
});
