describe("SurveyTemplateManagerService", function() {

    var Mock = {};
    var service;
    var deferred;
    var $rootScope;

    beforeEach(function() {
        module('studio');
        mockSurveyTemplate();

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
            deferred.resolve(Mock.surveyTemplate);

            spyOn(Mock.CrossSessionDatabaseService, "getAllSurveyTemplatesByContributor").and.returnValue(deferred.promise);

            service.initializeSurveyTemplateList();

            $rootScope.$digest();

            expect(service.surveyTemplatesList).toBe(Mock.surveyTemplate);
        });
    });

    describe("selectSurveyTemplate method", function() {
        beforeEach(function() {
            service.selectSurveyTemplate(Mock.surveyTemplate);
        });

        it("should put a selected survey template in selectedSurveyTemplate attribute", function() {
            expect(service.selectedSurveyTemplate).toBe(Mock.surveyTemplate);
        });

        it("should remove a selected survey template if it goes selected again", function() {
            service.selectSurveyTemplate(Mock.surveyTemplate);
            expect(service.selectedSurveyTemplate).toEqual({});
        });

    });

    describe("deleteSelectedSurveyTemplate method", function() {
        beforeEach(function() {
            /* populate the surveyTemplatesList */
            service.surveyTemplatesList.push(Mock.surveyTemplate);
            /* selecting a template */
            service.selectSurveyTemplate(Mock.surveyTemplate);
        });

        it("should call CrossSessionDatabaseService.deleteSurveyTemplate method", function() {
            spyOn(Mock.CrossSessionDatabaseService, "deleteSurveyTemplate");

            service.deleteSelectedSurveyTemplate();

            expect(Mock.CrossSessionDatabaseService.deleteSurveyTemplate).toHaveBeenCalledWith(Mock.surveyTemplate.template_oid);
        });

        it("should remove a recently removed surveyTemplate of selectedSurveyTemplate", function() {
            service.deleteSelectedSurveyTemplate();

            expect(service.selectedSurveyTemplate).toEqual({});
        });

    });

    function mockCrossSessionDatabaseService($injector) {
        Mock.CrossSessionDatabaseService = $injector.get('CrossSessionDatabaseService');
        return Mock.CrossSessionDatabaseService;
    }

    function mockSurveyTemplate() {
        Mock.surveyTemplate = {
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
