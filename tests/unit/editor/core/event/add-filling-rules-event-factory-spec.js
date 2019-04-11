describe('AddFillingRulesEventFactory suite', function () {

  var factory, addFillingRulesEvent, option;
  var Mock = {};
  var Injections = [];
  var whoAmI = 'accept';
  var OBJECT_TYPE = 'Rule';

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function (_$injector_) {

      Injections.AddFillingRulesService = _$injector_.get('AddFillingRulesService');
      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.WorkspaceService.workspace = mockWorkspace();
      Mock.question = _$injector_.get('SurveyItemFactory').create('IntegerQuestion', 'Q1');

      factory = _$injector_.get('AddFillingRulesEventFactory', Injections);
      spyOn(Injections.WorkspaceService, "saveWork");
      spyOn(Injections.AddFillingRulesService, "execute").and.callThrough();
    });
  });

  it('factoryExistence check', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence check', function () {
    expect(factory.create).toBeDefined();
  });

  it('create_method_should_instantiate_AddFillingRulesEvent', function () {
    expect(factory.create().execute).toBeDefined();
  });

  beforeEach(function () {
    addFillingRulesEvent = factory.create();
    addFillingRulesEvent.execute(Mock.question, whoAmI);
  });

  it('Instance_of_AddFillingRulesEventFactory_should_evoke_internalMethods', function () {
    expect(Injections.AddFillingRulesService.execute).toHaveBeenCalledTimes(1);
    expect(Injections.WorkspaceService.saveWork).toHaveBeenCalledTimes(1);
  });

  it('execute_method_of_AddFillingRulesEvent_should_return_OptionInstance', function () {
    option = addFillingRulesEvent.execute(Mock.question, whoAmI)
    expect(option.objectType).toBe(OBJECT_TYPE);
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
