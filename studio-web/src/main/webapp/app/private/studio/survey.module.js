(function() {

    var module = angular.module('survey', []);

    module.service('SurveyLoader', ['Survey', function(Survey) {
        var self = this;

        /* Public interface */
        self.newSurvey = newSurvey;

        /* Public interface implementation */
        function newSurvey() {
            return new Survey();
        }
    }]);

    module.factory('Survey', ['SurveyIdentity', function(SurveyIdentity) {
        return function() {
            this.objectType = 'Survey';
            this.identity = new SurveyIdentity();
            this.questions = [];
        };
    }]);

    module.factory('SurveyIdentity', [function() {
        return function() {
            this.objectType = 'SurveyIdentity';
            this.name = '';
            this.acronym = '';
            this.version = '';
            this.recommendedTo = '';
            this.description = '';
            this.keywords = [];
        };
    }]);

}());
