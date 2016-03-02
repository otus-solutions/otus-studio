(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('QuestionDataEditorController', QuestionDataEditorController);

    QuestionDataEditorController.$inject = [
        '$scope',
        '$element',
        'QuestionDataEditorContentService'
    ];

    function QuestionDataEditorController($scope, $element, QuestionDataEditorContentService) {
        var self = this;

        /* Public interface */
        self.update = update;

        init();

        function init() {
            QuestionDataEditorContentService.init($scope, $element);
        }

        function update(question) {
            self.selectedQuestion = question;
        }
    }

}());
