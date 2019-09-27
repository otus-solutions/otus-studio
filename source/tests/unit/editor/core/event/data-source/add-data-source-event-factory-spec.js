describe('AddDataSourceEventFactory Suite', function () {

  var factory;
  var Mock = {};
  var Injections = [];
  var NAME = 'test';

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function (_$injector_) {

      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.WorkspaceService.workspace = mockWorkspace();
      Mock.item = _$injector_.get('SurveyItemFactory').create('AutocompleteQuestion');

      factory = _$injector_.get('AddDataSourceEventFactory', Injections);

      mockSurvey();
      spyOn(Injections.WorkspaceService, "getSurvey").and.returnValue(Mock.survey);
      spyOn(Injections.WorkspaceService, "saveWork");
    });
  });

  it('factoryExistence check', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence check', function () {
    expect(factory.create).toBeDefined();
  });

  it('create_method_should_instantiate_AddDataSourceEvent', function () {
    expect(factory.create().execute).toBeDefined();
  });

  it('Instance_of_AddDataSourceEventFactory_should_evoke_internalMethods', function () {
    factory.create().execute(Mock.item,NAME);
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
  }

  function mockSurvey() {
    Mock.performBind = {
      performBind: jasmine.createSpy("performBind").and.returnValue(Mock.item.templateID)
    };

    Mock.survey = {
      getDataSource: jasmine.createSpy("getDataSource").and.returnValue(Mock.performBind)
    }
  }
});
