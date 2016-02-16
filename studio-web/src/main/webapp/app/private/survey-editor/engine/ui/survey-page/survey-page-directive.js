(function() {

    angular
        .module('editor.engine.ui')
        .directive('surveyPage', surveyPage);

    function surveyPage() {
        var ddo = {
            controller: 'SurveyPageController'
        };

        return ddo;
    }

}());
