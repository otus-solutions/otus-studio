describe("component: surveyTemplateList", function() {

    var ctrl,
        scope,
        $componentController,
        Mock = {};

    beforeEach(module('studio'));

    beforeEach(inject(function($rootScope, _$componentController_, _$injector_) {
        scope = $rootScope.$new();
        $componentController = _$componentController_;
        Mock.SurveyTemplateManagerService = _$injector_.get('SurveyTemplateManagerService');

    }));

    describe("on $onInit phase", function() {
        beforeEach(function() {
            ctrl = $componentController('surveyTemplatesList',
                null, {
                    SurveyTemplateManagerService: Mock.SurveyTemplateManagerService
                }
            );
            spyOn(ctrl.SurveyTemplateManagerService, "initializeSurveyTemplateList");

            ctrl.$onInit();
        });

        it("should call SurveyTemplateManagerService.initializeSurveyTemplateList()", function() {
            expect(ctrl.SurveyTemplateManagerService.initializeSurveyTemplateList).toHaveBeenCalled();
        });
    });

    describe("getSurveyTemplatesList method", function() {
        beforeEach(function() {
            ctrl = $componentController('surveyTemplatesList',
                null, {
                    SurveyTemplateManagerService: Mock.SurveyTemplateManagerService
                }
            );
        });

        it("should return a list of surveyTemplates", function() {
            expect(ctrl.getSurveyTemplatesList()).toEqual([]);
        });
    });

});
