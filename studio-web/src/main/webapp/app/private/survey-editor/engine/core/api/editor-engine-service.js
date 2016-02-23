(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .service('EditorEngineService', EditorEngineService);

    EditorEngineService.$inject = [
        'ModelService',
        'UpdateWorkFactory',
        'WorkspaceService'
    ];

    function EditorEngineService(ModelService, UpdateWorkFactory, WorkspaceService) {
        var self = this,
            survey = null;

        /* Public interface */
        self.edit = edit;

        function edit(editingEvent) {
            var updateWork = buildUpdateWork(editingEvent);
            ModelService.update(updateWork);
        }

        function buildUpdateWork(editingEvent) {
            var updateWork = UpdateWorkFactory.create();

            updateWork.survey = WorkspaceService.workspace.project.survey;
            updateWork.target = editingEvent.target;
            updateWork.type = editingEvent.type;

            if (editingEvent.state.domData)
                updateWork.data = editingEvent.state.domData;

            if (editingEvent.source.model) {
                updateWork.model = editingEvent.source.model;
                updateWork.questionId = updateWork.survey.identity.acronym + WorkspaceService.getQuestionId();
            }

            return updateWork;
        }
    }

}());
