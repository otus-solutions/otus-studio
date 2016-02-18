(function() {

    angular
        .module('editor.engine.core')
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
