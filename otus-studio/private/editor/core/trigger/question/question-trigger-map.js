(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('QuestionTriggerMap', QuestionTriggerMap);

    QuestionTriggerMap.$inject = [
        'QuestionEditorTriggerService',
    ];

    function QuestionTriggerMap(QuestionEditorTriggerService) {
        return {
            QuestionEditorTriggerService: QuestionEditorTriggerService
        };
    }

}());
