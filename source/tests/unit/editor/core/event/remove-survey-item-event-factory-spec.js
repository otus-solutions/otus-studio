describe('RemoveSurveyItemEventFactory_Suite', function () {

  var factory;
  var Mock = {};
  var Injections = [];

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function (_$injector_) {

      Injections.$rootScope = _$injector_.get('$rootScope');
      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.WorkspaceService.workspace = mockWorkspace();
      Injections.RemoveSurveyItemService = _$injector_.get('RemoveSurveyItemService');
      Injections.SurveyItemGroupService = _$injector_.get('SurveyItemGroupService');
      Mock.item = _$injector_.get('SurveyItemFactory').create('IntegerQuestion', 'Q1');

      factory = _$injector_.get('RemoveSurveyItemEventFactory', Injections);

      mockSurvey();
      spyOn(Injections.WorkspaceService, "getSurvey").and.returnValue(Mock.survey);
      spyOn(Injections.RemoveSurveyItemService, "execute").and.callThrough();
      spyOn(Injections.$rootScope, "$broadcast");
      spyOn(Injections.WorkspaceService, "saveWork");
      spyOn(Injections.SurveyItemGroupService, "getGroup");
    });
  });

  it('factoryExistence check', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence check', function () {
    expect(factory.create).toBeDefined();
  });

  it('create_method_should_instantiate_RemoveSurveyItemEventFactory', function () {
    expect(factory.create().execute).toBeDefined();
  });

  it('execute_method_should_evoke_internalMethods_of_instance_UpdateFillingRulesEvent', function () {
   Mock.position = 1;
    factory.create().execute(Mock.item, Mock.position);
   expect(Injections.RemoveSurveyItemService.execute).toHaveBeenCalledTimes(1);
   expect(Injections.$rootScope.$broadcast).toHaveBeenCalledTimes(1);
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

  function mockSurvey() {
    Mock.survey = {
      "removeItem": jasmine.createSpy()
    }
  };
});
