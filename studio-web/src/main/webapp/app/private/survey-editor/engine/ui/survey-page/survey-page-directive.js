(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .directive('surveyPage', surveyPage);

    function surveyPage() {
        var ddo = {
            restrict: 'E',
            controller: 'SurveyPageController'
        };

        return ddo;
    }

}());
