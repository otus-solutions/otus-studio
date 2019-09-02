describe('itemGroupComponent_UnitTests_Suite', function () {
  let ctrl;
  let Injections = []


  beforeEach(function () {
    angular.mock.module('studio');
    angular.mock.inject(function ($controller, $injector) {
      Injections.SurveyItemGroupService = $injector.get('SurveyItemGroupService');
      Injections.SurveyItemGroupValue = $injector.get('SurveyItemGroupValue');
      ctrl = $controller('SurveyItemGroupCtrl', Injections);
      ctrl.item = {templateID: "ID1"}
      spyOn(Injections.SurveyItemGroupService, "surveyItemsRegistry");
      spyOn(Injections.SurveyItemGroupService, "identifiesGroupItemStatus");
      spyOn(Injections.SurveyItemGroupService, "verifyEndItemGroup");
      spyOn(Injections.SurveyItemGroupService, "preparesValidCandidatesForGroupEditing");
      spyOn(Injections.SurveyItemGroupService, "setSurveyGroup");
      spyOn(Injections.SurveyItemGroupService, "monitoringCheckboxState");
    })
  });

  it('componentCtrlExistence_check ', function () {
    expect(ctrl).toBeDefined();
  });

  it('controllerMethodsExistence check', function () {
    expect(ctrl.$onInit).toBeDefined();
    expect(ctrl.editorSurveyItemGroup).toBeDefined();
    expect(ctrl.setSurveyGroup).toBeDefined();
    expect(ctrl.monitoringCheckboxState).toBeDefined();
  });

  it('test_should_verify_initial_values', function () {
    expect(ctrl.stateItemGroup).toBe(Injections.SurveyItemGroupValue.CREATE_ITEM_GROUP_STATE);
    expect(ctrl.itemCandidateCheckbox).toBeFalsy();
    expect(ctrl.stateColor).toBe(Injections.SurveyItemGroupValue.STATE_COLOR);
  });

  it('$onInitMethod_should_invoke_surveyItemsRegistry_by_SurveyItemGroupService', function () {
    ctrl.$onInit()
    expect(Injections.SurveyItemGroupService.surveyItemsRegistry).toHaveBeenCalledTimes(1)
  });

  it('editorSurveyItemGroupMethod_should_invoke_preparesValidCandidatesForGroupEditing_by_SurveyItemGroupService', function () {
    ctrl.editorSurveyItemGroup()
    expect(Injections.SurveyItemGroupService.preparesValidCandidatesForGroupEditing).toHaveBeenCalledTimes(1)
  });

  it('setSurveyGroupMethod_should_invoke_setSurveyGroup_by_SurveyItemGroupService', function () {
    ctrl.setSurveyGroup()
    expect(Injections.SurveyItemGroupService.setSurveyGroup).toHaveBeenCalledTimes(1)
  });

  it('monitoringCheckboxStateMethod_should_invoke_monitoringCheckboxState_by_SurveyItemGroupService', function () {
    ctrl.monitoringCheckboxState(ctrl.item.templateID)
    expect(Injections.SurveyItemGroupService.monitoringCheckboxState).toHaveBeenCalledTimes(1)
  });
});


