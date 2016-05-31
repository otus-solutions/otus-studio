describe("SurveyTemplateManagerService", function() {

    var Mock = {};
    var service;
    var deferred;
    var $rootScope;

    beforeEach(function() {
        module('studio');
        mockSurveyTemplates();

        inject(function(_$injector_, $q, _$rootScope_) {
            $rootScope = _$rootScope_;
            deferred = $q.defer();
            service = _$injector_.get('SurveyTemplateManagerService', {
                CrossSessionDatabaseService: mockCrossSessionDatabaseService(_$injector_)
            });
        });
    });

    describe("initializeSurveyTemplateList method", function() {

        it("should be defined in service", function() {
            expect(service.initializeSurveyTemplateList).toBeDefined();
        });

        it("should call CrossSessionDatabaseService.getAllSurveyTemplatesByContributor method", function() {
            spyOn(Mock.CrossSessionDatabaseService, "getAllSurveyTemplatesByContributor").and.callThrough();

            service.initializeSurveyTemplateList();

            expect(Mock.CrossSessionDatabaseService.getAllSurveyTemplatesByContributor).toHaveBeenCalled();
        });

        it("should populate a surveyTemplatesList", function() {
            deferred.resolve(Mock.surveyTemplate_ONE);

            spyOn(Mock.CrossSessionDatabaseService, "getAllSurveyTemplatesByContributor").and.returnValue(deferred.promise);

            service.initializeSurveyTemplateList();

            $rootScope.$digest();

            expect(service.surveyTemplatesList).toBe(Mock.surveyTemplate_ONE);
        });
    });

    describe("selectSurveyTemplate method", function() {
        beforeEach(function() {
            service.selectSurveyTemplate(Mock.surveyTemplate_ONE);
        });

        it("should put a selected survey template in selectedSurveyTemplatesList", function() {
            expect(service.selectedSurveyTemplatesList).toContain(Mock.surveyTemplate_ONE);
        });

        it("should remove a selected survey template of the selectedSurveyTemplatesList if it goes selected again", function() {
            service.selectSurveyTemplate(Mock.surveyTemplate_ONE);
            expect(service.selectedSurveyTemplatesList.length).toBe(0);
        });

    });

    describe("deleteSelectedSurveyTemplate method", function() {
        beforeEach(function() {
            /* populate the surveyTemplatesList */
            service.surveyTemplatesList.push(Mock.surveyTemplate_ONE);
            /* selecting a template */
            service.selectSurveyTemplate(Mock.surveyTemplate_ONE);
        });

        it("should call CrossSessionDatabaseService.deleteSurveyTemplate method", function() {
            spyOn(Mock.CrossSessionDatabaseService, "deleteSurveyTemplate");

            service.deleteSelectedSurveyTemplate();

            expect(Mock.CrossSessionDatabaseService.deleteSurveyTemplate).toHaveBeenCalledWith(Mock.surveyTemplate_ONE.template_oid);
        });

        it("should remove a recently removed surveyTemplate of surveyTemplateList", function() {
            service.deleteSelectedSurveyTemplate();

            expect(service.surveyTemplatesList.length).toBe(0);
        });

    });

    describe("hasSelectedSurveyTemplate method", function () {

        it("should return TRUE when the selectedSurveyTemplatesList is NOT empty", function () {
            service.selectSurveyTemplate(Mock.surveyTemplate_ONE);
            expect(service.hasSelectedSurveyTemplate()).toBe(true);
        });

        it("should return FALSE when the selectedSurveyTemplatesList is empty", function () {
            expect(service.hasSelectedSurveyTemplate()).toBe(false);
        });

    });

    function mockCrossSessionDatabaseService($injector) {
        Mock.CrossSessionDatabaseService = $injector.get('CrossSessionDatabaseService');
        return Mock.CrossSessionDatabaseService;
    }

    function mockSurveyTemplates() {
        Mock.surveyTemplate_ONE = {
            $$hashKey: 1,
            template_oid: 'survey.oid',
            name: 'survey.name',
            version: 'survey.version',
            toJson: function() {
                return '{}';
            }
        };
    }

});
