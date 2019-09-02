describe('SurveyItemGroupService_UnitTests_Suite', function () {
  let service;
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

      service = $injector.get('SurveyItemGroupService', Injections);

      Mock.SurveyItemGroupManagerFactory = $injector.get('otusjs.surveyItemGroup.SurveyItemGroupManagerFactory')
      //service.workspace.project = {survey: jasmine.createSpy()};

      Mock.surveyItemGroupCtrl = $controller('SurveyItemGroupCtrl');
      Mock.surveyItemGroupCtrl.item = {templateID:"TST3"};
      Mock.id = Mock.surveyItemGroupCtrl.item.templateID;

      Mock.SurveyResult = {SurveyItemGroupManager: Mock.SurveyItemGroupManagerFactory.create()};
      spyOn(Injections.WorkspaceService, "getSurvey").and.returnValues(Mock.SurveyResult);
    })
  });

  it('serviceExistence check ', function () {
    console.log(service);
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
    expect(service.questionItemReference[Mock.id].stateControl).toBe(_stateControl);
    expect(service.questionItemReference[Mock.id].ctrl).toBe(Mock.surveyItemGroupCtrl)
  });

  it('verifyEndItemGroupMethod_should_', function () {
    //console.log(service)
    //console.log(Injections.WorkspaceService)
    //console.log(Mock.SurveyItemGroupManagerFactory.create())
    //console.log(Injections.WorkspaceService.getSurvey())
    console.log(Mock.id);
    spyOn(Mock.SurveyResult.SurveyItemGroupManager, "getGroupByMember")
      .and.returnValues({end: "TST3"});

    console.log(service.verifyEndItemGroup(Mock.id));

    //Mock.SurveyItemGroupManager = {};
    //WorkspaceService.getSurvey().SurveyItemGroupManager.getSurveyItemGroups();
    //Mock.ownerWorkSession = {owner: "visitor"};
    //Injections.WorkspaceService.initializeWorkspace(Mock.ownerWorkSession);
    //console.log(Injections.WorkspaceService.getSurvey());
    //console.log(Injections.SurveyItemGroupManagerFactory.create())
    //service.verifyEndItemGroup(Mock.id);
  });
});

function _stateControl() {
  let vm = this;
  self.stateItemGroup = vm.status;
}

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



