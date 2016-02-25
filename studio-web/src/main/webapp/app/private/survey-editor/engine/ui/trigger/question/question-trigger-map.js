(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
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
