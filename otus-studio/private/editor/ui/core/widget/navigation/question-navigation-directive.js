(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('navigationQuestion', navigationQuestion);


    function navigationQuestion() {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'QuestionNavigationController',
            templateUrl: 'private/editor/ui/core/widget/navigation/question-navigation-template.html',
        };

        return ddo;
    }

}());
