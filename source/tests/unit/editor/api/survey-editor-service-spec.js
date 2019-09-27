describe('SurveyEditorService Suite', function () {

  var service;
  var Mock = {};
  var Injections = [];

  beforeEach(function() {
    angular.mock.module('studio');

    angular.mock.inject(function(_$injector_) {

      Injections.WorkspaceService = _$injector_.get('WorkspaceService');
      Mock.item = _$injector_.get('SurveyFactory').create('TEST');

      service = _$injector_.get('SurveyEditorService', Injections);

      spyOn(Injections.WorkspaceService, "initializeWorkspace");
      spyOn(Injections.WorkspaceService, "startNewWork");
      spyOn(Injections.WorkspaceService, "loadWork");
    });
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  it('serviceMethodExistence check', function () {
    expect(service.startEditor).toBeDefined();
    expect(service.startEditorWithSurveyTemplate).toBeDefined();
  });

  it('startEditor_method_should_instantiate_SurveyEditorService', function () {
    service.startEditor(Mock.item);
    expect(Injections.WorkspaceService.initializeWorkspace).toHaveBeenCalledTimes(1);
    expect(Injections.WorkspaceService.startNewWork).toHaveBeenCalledTimes(1);
  });

  it('startEditorWithSurveyTemplate_method_should_instantiate_SurveyEditorService', function() {
    service.startEditorWithSurveyTemplate(Mock.item);

    expect(Injections.WorkspaceService.initializeWorkspace).toHaveBeenCalledTimes(1);
    expect(Injections.WorkspaceService.loadWork).toHaveBeenCalledTimes(1);
  });

});
