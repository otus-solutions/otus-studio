(function() {

    angular
        .module('protocolSpecification')
        .service('SurveyLoader', ['Survey', SurveyLoader]);

    function SurveyLoader(Survey) {
        var self = this;

        /* Public interface */
        self.newSurvey = newSurvey;

        /* Public interface implementation */
        function newSurvey() {
            return new Survey();
        }
    }

}());
