(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .service('SurveyLoaderService', SurveyLoaderService);

    SurveyLoaderService.$inject = ['ModelFacadeService'];

    function SurveyLoaderService(ModelFacadeService) {
        var self = this;

        /* Public interface */
        self.newSurvey = newSurvey;
        self.loadSurvey = loadSurvey;

        /* Public interface implementation */
        function newSurvey(name, acronym, version) {
            return ModelFacadeService.getSurveyFactory().create(name, acronym);
        }

        function loadSurvey(name, acronym, uuid) {
            var surveyTemplate = ModelFacadeService.getSurveyFactory().create(name, acronym);
            surveyTemplate.oid = uuid;
            return surveyTemplate;
        }
    }

}());
