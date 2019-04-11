describe('RemoveFillingRulesEventFactory_Suite', function () {

  var factory;
  var Mock = {};
  var Injections = [];
  var FILLING_RULE_TYPE = 'accept';

  beforeEach(function () {

    angular.mock.module('studio');

    angular.mock.inject(function (_$injector_) {

      Injections.RemoveFillingRulesWorkService = _$injector_.get('RemoveFillingRulesWorkService');
      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Injections.WorkspaceService.workspace = mockWorkspace();
      Mock.item = _$injector_.get('SurveyItemFactory').create('IntegerQuestion', 'Q1');
      Mock.otusAcceptAnswerCtrl = mockComponentCtrl();

      factory = _$injector_.get('RemoveFillingRulesEventFactory', Injections);
      spyOn(Injections.RemoveFillingRulesWorkService, "execute").and.callThrough();
      spyOn(Injections.WorkspaceService, "saveWork")
    });
  });

  it('factoryExistence check', function () {
    expect(factory).toBeDefined();
  });

  it('factoryMethodsExistence check', function () {
    expect(factory.create).toBeDefined();
  });

  it('execute_method_should_evoke_internalMethods_of_instance_RemoveFillingRulesEvent', function () {
    factory.create().execute(Mock.otusAcceptAnswerCtrl, FILLING_RULE_TYPE);
    expect(Injections.RemoveFillingRulesWorkService.execute).toHaveBeenCalledTimes(1);
    expect(Injections.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledTimes(1);
    expect(Injections.WorkspaceService.saveWork).toHaveBeenCalledTimes(1);
  });

  function mockComponentCtrl() {
    return Mock.otusAcceptAnswerCtrl = {
      item: Mock.item,
      getItem: function () {
        return Mock.item;
      }
    }
  };

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
