(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('QuestionPaletteController', QuestionPaletteController);

    QuestionPaletteController.$inject = ['$scope', 'SurveyEditorService'];

    function QuestionPaletteController($scope, SurveyEditorService) {
        var self = this;
        self.isOpened = false;

        /* Public interface */
        self.changeState = changeState;
        self.addTextQuestion = addTextQuestion;

        /* Public interface implemenation */
        function changeState() {
            self.isOpened = !self.isOpened;
        }

        function addTextQuestion() {
        }

    }

}());
