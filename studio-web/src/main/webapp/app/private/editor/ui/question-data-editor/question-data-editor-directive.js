(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('questionDataEditor', questionDataEditor);

    function questionDataEditor() {
        var ddo = {
            retrict: 'E',
            controller: 'QuestionDataEditorController',
            templateUrl: 'private/editor/ui/question-data-editor/question-data-editor.html',
        };

        return ddo;
    }

}());
