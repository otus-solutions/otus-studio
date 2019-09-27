describe(' UpdateQuestionEventFactory_Suite', function () {
  var factory;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function (_$injector_) {

      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.WorkspaceService.workspace = mockWorkspace();

      factory = _$injector_.get('UpdateQuestionEventFactory', Injections);
      spyOn(Injections.WorkspaceService, "saveWork");
    });
  });

  it('factoryExistence check', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence check', function () {
    expect(factory.create).toBeDefined();
  });

  it('create_method_should_instantiate_UpdateQuestionEvent', function () {
    expect(factory.create().execute).toBeDefined();
  });

  it('execute_method_should_evoke_internalMethods_of_instance_UpdateQuestionEvent', function () {
    factory.create().execute(Injections.WorkspaceService);
    expect(Injections.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledTimes(1);
    expect(Injections.WorkspaceService.saveWork).toHaveBeenCalledTimes(1);
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
});
