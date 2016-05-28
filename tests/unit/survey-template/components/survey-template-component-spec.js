describe("component: SurveyTemplateComponent", function() {

    var component, scope, surveyTemplate, $componentController;
    var Mock = {};

    beforeEach(module('studio'));

    beforeEach(inject(function($rootScope, _$componentController_, _$injector_) {
        scope = $rootScope.$new();
        $componentController = _$componentController_;
        surveyTemplate = {
            template_oid: '12345'
        };
        Mock.SurveyTemplateManagerService = _$injector_.get('SurveyTemplateManagerService');

    }));

});
