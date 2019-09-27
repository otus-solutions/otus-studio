describe('SurveyItemGroupService_UnitTests_Suite', function () {
  let service, groupManager;
  let Injections = [];
  let Mock = {};

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function ($injector, $controller, $rootScope, $mdDialog) {
      Injections.$rootScope = $injector.get("$rootScope");
      Injections.WorkspaceService = $injector.get("WorkspaceService");
      Injections.AddSurveyItemGroupEventFactory = $injector.get("AddSurveyItemGroupEventFactory");
      Injections.$mdDialog = $injector.get("$mdDialog");
      Injections.DialogService = $injector.get("DialogService");
      Injections.SurveyItemGroupValue = $injector.get("SurveyItemGroupValue");

      Mock.SurveyItemGroupValue = $injector.get("SurveyItemGroupValue");
      Mock.SurveyItemGroupManagerFactory = $injector.get('otusjs.surveyItemGroup.SurveyItemGroupManagerFactory');
      Mock.SurveyResult = {SurveyItemGroupManager: Mock.SurveyItemGroupManagerFactory.create()};
      spyOn(Injections.WorkspaceService, "getSurvey").and.callFake(()=> Mock.SurveyResult);

      service = $injector.get('SurveyItemGroupService', Injections);
      groupManager = Mock.SurveyResult.SurveyItemGroupManager;

      //simulates componentController registry preparation
      Mock.ids = ["TST1", "TST3"];
      Mock.ids.forEach(id => {
        Mock.surveyItemGroupCtrl = $controller('SurveyItemGroupCtrl');
        Mock.surveyItemGroupCtrl.item = {templateID: id};
      });

      Mock.candidates = ["TST4", "TST5", "TST6"];
      spyOn(groupManager, "getGroupByMember").and.callFake(() => mockGroup());
      spyOn(groupManager, "getGroupCandidates").and.callFake(() => Mock.candidates);
      spyOn(Injections.DialogService, "show").and.callThrough();
    });
  });

  it('serviceExistence check ', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence check', function () {
    expect(service.surveyItemsRegistry).toBeDefined();
    expect(service.verifyEndItemGroup).toBeDefined();
    expect(service.identifiesGroupItemStatus).toBeDefined();
    expect(service.preparesValidCandidatesForGroupEditing).toBeDefined();
    expect(service.setSurveyGroup).toBeDefined();
    expect(service.monitoringCheckboxState).toBeDefined();
  });

  it('surveyItemsRegistryMethod_should_register_reference_map', function () {
    service.surveyItemsRegistry(Mock.surveyItemGroupCtrl, _stateControl);
    expect(service.questionItemReference[Mock.ids[1]].stateControl).toBe(_stateControl);
    expect(service.questionItemReference[Mock.ids[1]].ctrl).toBe(Mock.surveyItemGroupCtrl)
  });

  it('verifyEndItemGroupMethod_check_if_it_is_the_last_element_of_the_group', function () {
    expect(service.verifyEndItemGroup(Mock.ids[1])).toBeTruthy();
  });

  it('identifiesGroupItemStatus_should_set_states_to_foundGroupItems', function () {
    //simulates filling in the references
    mockSetReference(Mock.ids, service, Mock.surveyItemGroupCtrl);
    service.identifiesGroupItemStatus(Mock.ids[1]);
    expect(service.questionItemReference[Mock.ids[1]].ctrl.stateItemGroup).toBe(Mock.SurveyItemGroupValue.SAVED_ITEM_GROUP_STATE);
    expect(service.questionItemReference[Mock.ids[1]].ctrl.stateColor).toBe("#733fe8");
  });

  it('preparesValidCandidatesForGroupEditingMethod_should_set_states_to_foundCandidates', function () {
    mockSetReference(Mock.candidates, service, Mock.surveyItemGroupCtrl);
    service.preparesValidCandidatesForGroupEditing(Mock.candidates[0]);
    expect(service.questionItemReference[Mock.candidates[0]].ctrl.stateItemGroup).toBe(Mock.SurveyItemGroupValue.CREATE_ITEM_GROUP_STATE);
  });

  it('setSurveyGroup_method_should_call_dialogue_with_preparedCandidates', function () {
    mockSetReference(Mock.candidates, service, Mock.surveyItemGroupCtrl);
    service.setSurveyGroup(Mock.candidates[0]);
    expect(Injections.DialogService.show).toHaveBeenCalledTimes(1);
  });

  it('monitoringCheckboxStateMethod_should_access_internalMethod_unmarkCandidatesPerBlock', function () {
    Mock.surveyItemGroupCtrl.itemCandidateCheckbox = true;
    service.monitoringCheckboxState(Mock.surveyItemGroupCtrl)
  });

  it('monitoringCheckboxStateMethod_should_access_internalMethod_markCandidatesPerBlock', function () {
    Mock.surveyItemGroupCtrl.itemCandidateCheckbox = false;
    service.monitoringCheckboxState(Mock.surveyItemGroupCtrl)
  });
});

function _stateControl() {
  let vm = this;
  self.stateItemGroup = vm.status;
}

function mockGroup() {
  return {
    objectType: "SurveyItemGroup",
    start: "TST1",
    end: "TST3",
    members: [{id: "TST1", position: "start"}, {id: "TST3", position: "end"}]
  };
}

function mockSetReference(ids, service, ctrl) {
  ids.forEach(id => {
    service.questionItemReference[id] = {
      stateControl: _stateControl,
      ctrl: ctrl
    }
  });
}



