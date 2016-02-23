(function() {
    'use strict';

    angular
        .module('otusjs')
        .service('SurveyLoaderService', SurveyLoaderService);

    SurveyLoaderService.$inject = ['SurveyFactory'];

    function SurveyLoaderService(SurveyFactory) {
        var self = this;

        /* Public interface */
        self.newSurvey = newSurvey;

        /* Public interface implementation */
        function newSurvey() {
            return SurveyFactory.create();
        }
    }

}());
