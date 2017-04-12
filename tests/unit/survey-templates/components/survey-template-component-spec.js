describe("component: SurveyTemplateComponent", function() {

    var component,
        compiledComponent,
        scope,
        SelectedSurveyTemplatesManagementService,
        $componentController,
        $compile;
    var Mock = {};
    var TEMPLATE = '';

    beforeEach(module('studio'));

    beforeEach(inject(function(_$componentController_, _$injector_) {
        $rootScope = _$injector_.get('$rootScope');
        $compile = _$injector_.get('$compile');
        $httpBackend = _$injector_.get('$httpBackend');
        $componentController = _$componentController_;

        $httpBackend.when('GET', 'app/dashboard/survey-templates/components/survey-template/survey-template.html').respond(TEMPLATE);
        SelectedSurveyTemplatesManagementService = mockSelectedSurveyTemplatesManagementService(_$injector_);
        compiledComponent = getCompiledDirective($rootScope, $compile);
    }));

    describe("should be compiled with success", function () {

        xit("not working", function () {
            expect(compiledComponent).toBeDefined();
        });
        xit("not working", function () {
            spyOn(SelectedSurveyTemplatesManagementService, 'selectSurveyTemplate');
            compiledComponent.triggerHandler('click');
            expect(Mock.SelectedSurveyTemplatesManagementService.selectSurveyTemplate).toHaveBeenCalled();
        });
    });

    function getCompiledDirective($rootScope, $compile) {
        scope = $rootScope.$new();
        component = '<survey-template></survey-template>';
        compiledComponent = $compile(component)(scope);
        scope.$digest();
        return component;
    }

    function mockSelectedSurveyTemplatesManagementService(_$injector_) {
        Mock.SelectedSurveyTemplatesManagementService = _$injector_.get('SelectedSurveyTemplatesManagementService');
        return Mock.SelectedSurveyTemplatesManagementService;
    }
});
