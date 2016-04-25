(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('numericQuestion', numericQuestion);

    numericQuestion.$inject = ['editor.ui.mpath'];

    function numericQuestion(mpath) {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/question/numeric/numeric-question.html',
            retrict: 'E',
            link: function linkFunc(scope) {
                scope.unit = scope.$parent.question.unit;
            }
        };

        return ddo;
    }

}());
