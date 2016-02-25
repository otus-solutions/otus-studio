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

        /* Public interface implementation */
        function newSurvey() {
            return ModelFacadeService.getSurveyFactory().create();
        }
    }

}());
