describe('Tests for survey-template-export-service', function() {

    var Mock = {};

    /* @BeforeScenario */
    beforeEach(function() {
        module('studio');

        inject(function(_$controller_, _$injector_) {
            /* @InjectMocks */
            controller = _$controller_('SurveyExportService', {
                'WorkspaceService': mockWorkspaceService(_$injector_)
            });
        });
    });

    describe("unit test for return the json", function functionName() {

        it("should return format correct Json", function functionName() {

        });

        it("should return object type Json", function functionName() {

        });
    });

    function mockWorkspaceService($injector) {
        Mock.WorkspaceService = $injector.get('WorkspaceService');
        return Mock.WorkspaceService;
    }

});
