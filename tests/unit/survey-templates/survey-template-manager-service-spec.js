xdescribe("SurveyTemplateManagerService", function() {

    var Mock = {};
    var service;
    var deferred;
    var $rootScope;

    beforeEach(function() {
        angular.mock.module('studio');
        mockSurveyTemplates();

        inject(function(_$injector_, $q, _$rootScope_) {
            $rootScope = _$rootScope_;
            deferred = $q.defer();
            service = _$injector_.get('SurveyTemplateManagerService', {
                CrossSessionDatabaseService: mockCrossSessionDatabaseService(_$injector_),
                SurveyExportService: mockSurveyExportService(_$injector_)
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

        it("should populate a surveyTemplates", function() {
            deferred.resolve(Mock.surveyTemplate_ONE);

            spyOn(Mock.CrossSessionDatabaseService, "getAllSurveyTemplatesByContributor").and.returnValue(deferred.promise);

            service.initializeSurveyTemplateList();

            $rootScope.$digest();

            expect(service.surveyTemplates).toBe(Mock.surveyTemplate_ONE);
        });
    });

    describe("deleteTemplate method", function() {
        beforeEach(function() {
            /* populate the surveyTemplates */
            service.surveyTemplates.push(Mock.surveyTemplate_ONE);
        });

        it("should call CrossSessionDatabaseService.deleteSurveyTemplate method", function() {
            spyOn(Mock.CrossSessionDatabaseService, "deleteSurveyTemplate");

            service.deleteSurveyTemplate(Mock.surveyTemplate_ONE);

            expect(Mock.CrossSessionDatabaseService.deleteSurveyTemplate).toHaveBeenCalledWith(Mock.surveyTemplate_ONE.template_oid);
        });

        it("should remove a recently removed surveyTemplate of surveyTemplateList", function() {
            service.deleteSurveyTemplate(Mock.surveyTemplate_ONE);

            expect(service.surveyTemplates.length).toBe(0);
        });

    });

    describe("exportSurveyTemplate method", function() {

        it("should call SurveyExportService.exportSurvey method", function() {
            spyOn(Mock.SurveyExportService, "exportSurvey");

            service.exportSurveyTemplate(Mock.surveyTemplate_ONE);

            expect(Mock.SurveyExportService.exportSurvey).toHaveBeenCalled();
        });

    });

    function mockCrossSessionDatabaseService($injector) {
        Mock.CrossSessionDatabaseService = $injector.get('CrossSessionDatabaseService');
        return Mock.CrossSessionDatabaseService;
    }

    function mockSurveyExportService($injector) {
        Mock.SurveyExportService = $injector.get('SurveyExportService');
        return Mock.SurveyExportService;
    }

    function mockSurveyTemplates() {
        Mock.surveyTemplate_ONE = {
            $$hashKey: 1,
            template: {},
            template_oid: 'survey.oid',
            name: 'survey.name',
            version: 'survey.version',
            toJson: function() {
                return '{}';
            }
        };
    }

});
