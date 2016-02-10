(function() {

    angular
        .module('protocolSpecification')
        .factory('SurveyFactory', ['SurveyIdentity', SurveyFactory]);

    function SurveyFactory(SurveyIdentity) {
        return function Survey() {
            this.objectType = 'Survey';
            this.identity = new SurveyIdentity();
            this.questions = [];

            this.getQuestion = function getQuestion(index) {
                return this.questions[index];
            };
        };
    }

}());
