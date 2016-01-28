(function() {

    angular
        .module('core')
        .service('SurveyService', SurveyService);

    var SurveyService = function() {

        var self = this;

        /* Public interface */
        self.setName = setName;
        self.setAcronym = setAcronym;
        self.setRecommendation = setRecommendation;
        self.setDescription = setDescription;
        self.setKeywords = setKeywords;
        self.addQuestion = addQuestion;
        self.removeQuestion = removeQuestion;
        self.selectQuestion = selectQuestion;

        /* Public interface implemenation */
        function setName(value) {
            console.log('setName: ' + value);
        }

        function setAcronym(value) {
            console.log('setAcronym: ' + value);
        }

        function setRecommendation(value) {
            console.log('setRecommendation: ' + value);
        }

        function setDescription(value) {
            console.log('setDescription: ' + value);
        }

        function setKeywords(value) {
            console.log('setKeywords: ' + value);
        }

        function addQuestion(value) {
            console.log('addQuestion: ' + value);
        }

        function removeQuestion(value) {
            console.log('removeQuestion: ' + value);
        }

        function selectQuestion(value) {
            console.log('selectQuestion: ' + value);
        }

    };

}());
