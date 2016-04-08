(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('surveyPage', surveyPage);

    function surveyPage() {
        var ddo = {
            restrict: 'E',
            controller: 'SurveyPageController'
        };

        return ddo;
    }

}());
