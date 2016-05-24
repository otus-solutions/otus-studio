describe('SurveyExportService', function() {

    var Mock = {};

    /* @BeforeScenario */
    beforeEach(function() {
        module('studio');

        mockSurveyTemplate();

        inject(function(_$injector_) {
            /* @InjectMocks */
            service = _$injector_.get('SurveyExportService', {
                'WorkspaceService': mockWorkspaceService(_$injector_)
            });
        });
    });

    describe('service.exportSurvey method', function functionName() {

        it('should return correct string for download', function functionName() {
            var returnedJSON = service.exportSurvey(Mock.WorkspaceService.getSurvey());

            expect(returnedJSON).toEqual(Mock.SURVEY_TEMPLATE_RESULT);
        });

        it('should call survey.toJson()', function functionName() {
            spyOn(Mock.survey, 'toJson');

            service.exportSurvey(Mock.WorkspaceService.getSurvey());

            expect(Mock.survey.toJson).toHaveBeenCalled();
        });

        it('should call encodeURIComponent', function functionName() {
            spyOn(window, 'encodeURIComponent');

            service.exportSurvey(Mock.WorkspaceService.getSurvey());

            expect(window.encodeURIComponent).toHaveBeenCalledWith(jasmine.any(String));
        });

    });

    function mockSurveyTemplate() {
        Mock.survey = {
            oid: 'survey.oid',
            name: 'survey.name',
            version: 'survey.version',
            toJson: function() {
                return '{}';
            }
        };

        Mock.SURVEY_TEMPLATE_RESULT = 'data:text/json;charset=utf-8,';
        Mock.SURVEY_TEMPLATE_RESULT += encodeURIComponent(Mock.survey.toJson());
    }

    function mockWorkspaceService($injector) {
        Mock.WorkspaceService = $injector.get('WorkspaceService');

        Mock.WorkspaceService.workspace = {
            project: {
                'survey': Mock.survey
            }
        };

        return Mock.WorkspaceService;
    }

});
