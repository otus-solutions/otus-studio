(function() {

    angular
        .module('editor.engine.core')
        .service('QuestionEditorTriggerService', QuestionEditorTriggerService);

    QuestionEditorTriggerService.$inject = ['EditingEventService'];

    function QuestionEditorTriggerService(EditingEventService) {
        var self = this,
            sourceComponentType = 'question-editor';

        /* Public interface */
        self.getTrigger = getTrigger;
        self.getSourceComponentType = getSourceComponentType;

        function getTrigger(editingSource) {
            return new QuestionEditorTrigger(EditingEventService, editingSource);
        }

        function getSourceComponentType() {
            return sourceComponentType;
        }
    }

    function QuestionEditorTrigger(EditingEventService, editingSource) {
        var self = this;

        self.name = 'QuestionEditorTrigger';
        self.tree = 'question';
        self.sourceComponentType = 'question-editor';
        self.editingSource = editingSource;

        watchDomComponent();

        function watchDomComponent() {
            var jqElement = angular.element(self.editingSource.component);

            jqElement.on('click', function setFocusTrigger() {
                EditingEventService.performEvent(self.editingSource);
            });
        }
    }

}());
