describe('SurveyTemplateExportDirective', function() {
    var Mock = {};

    /* @BeforeScenario */
    beforeEach(function functionName() {
        module('studio');

        inject(function(_$injector_) {
            /* @InjectMocks */
            directive = _$injector_.get('surveyTemplateExport', {
                'WorkspaceService': mockWorkspaceService(_$injector_)
            });
        });
    });

});
