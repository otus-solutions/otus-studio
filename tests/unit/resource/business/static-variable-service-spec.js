describe('StaticVariableService', function () {

  var service;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('studio');

    mockData();

    angular.mock.inject(function (_$injector_) {

      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.AddStaticVariableEventFactory = _$injector_.get('resources.core.AddStaticVariableEventFactory');
      Injections.RemoveStaticVariableEventFactory = _$injector_.get('resources.core.RemoveStaticVariableEventFactory');
      Injections.UpdateStaticVariableEventFactory = _$injector_.get('resources.core.UpdateStaticVariableEventFactory');
      Injections.WorkspaceService.workspace = mockWorkspace();

      service = _$injector_.get('resources.business.StaticVariableService', Injections);

      spyOn(Injections.WorkspaceService, "getSurvey").and.returnValue({ createStaticVariable: () => { } });
      spyOn(Injections.AddStaticVariableEventFactory, 'create').and.returnValue({ execute: () => { } });
      spyOn(Injections.RemoveStaticVariableEventFactory, 'create').and.returnValue({ execute: () => { } });
      spyOn(Injections.UpdateStaticVariableEventFactory, 'create').and.returnValue({ execute: () => { } });
    });
  });

  describe('basic suit unit test', function () {
    it('serviceExistence check', function () {
      expect(service).toBeDefined();
    });
  })

  describe('createStructureToStaticVariable method', function () {
    it('should call getSurvey method', function () {
      service.createStructureToStaticVariable();

      expect(Injections.WorkspaceService.getSurvey).toHaveBeenCalledTimes(1);
    });
  });

  describe('createVariable method', function () {
    it('should call create method', function () {
      service.createVariable(Mock.variable);

      expect(Injections.AddStaticVariableEventFactory.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeVariable method', function () {
    it('should call execute method', function () {
      service.removeVariable(0);

      expect(Injections.RemoveStaticVariableEventFactory.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateVariable method', function () {
    it('should call execute method', function () {
      service.updateVariable(0, Mock.variable);

      expect(Injections.UpdateStaticVariableEventFactory.create).toHaveBeenCalledTimes(1);
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
  }

  function mockData() {
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
