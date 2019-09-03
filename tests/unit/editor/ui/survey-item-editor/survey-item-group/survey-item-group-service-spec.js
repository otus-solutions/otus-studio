describe('SurveyItemGroupService_UnitTests_Suite', function () {
  let service, groupManager;
  let Injections = [];
  let Mock = {};

  beforeEach(function () {
    angular.mock.module('studio');

    angular.mock.inject(function ($injector, $controller,$rootScope, $mdDialog) {
      Injections.$rootScope = $injector.get("$rootScope");
      Injections.WorkspaceService = $injector.get("WorkspaceService");
      Injections.AddSurveyItemGroupEventFactory = $injector.get("AddSurveyItemGroupEventFactory");
      Injections.$mdDialog = $injector.get("$mdDialog");
      Injections.DialogService = $injector.get("DialogService");
      Injections.SurveyItemGroupValue = $injector.get("SurveyItemGroupValue");

      Mock.SurveyItemGroupManagerFactory = $injector.get('otusjs.surveyItemGroup.SurveyItemGroupManagerFactory');
      Mock.SurveyResult = {SurveyItemGroupManager: Mock.SurveyItemGroupManagerFactory.create()};
      spyOn(Injections.WorkspaceService, "getSurvey").and.callFake(function () {
        return Mock.SurveyResult;
      });

      service = $injector.get('SurveyItemGroupService', Injections);
      groupManager = Mock.SurveyResult.SurveyItemGroupManager;

      //Registry emulation
      Mock.ids = ["TST1", "TST3"]
      Mock.ids.forEach(id => {
         Mock.surveyItemGroupCtrl = $controller('SurveyItemGroupCtrl');
         Mock.surveyItemGroupCtrl.item = {templateID: id};
      });

      spyOn(groupManager, "getGroupByMember")
        .and.callFake(function () {
          let group = {
            objectType: "SurveyItemGroup",
            start: "TST1",
            end: "TST3",
            members: [{id: "TST1", position: "start"}, {id: "TST3", position: "end"}]
          };
          return group;
      });
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

  it('identifiesGroupItemStatus_should_set_states_to_found_group_items', function () {
    console.log(service.questionItemReference[Mock.ids[1]])
    //service.identifiesGroupItemStatus(Mock.ids[1]);
  });

});

function _stateControl() {
  let vm = this;
  self.stateItemGroup = vm.status;
}



