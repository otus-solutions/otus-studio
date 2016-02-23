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
            console.log(updateWork);
        }

        function buildUpdateWork(editingEvent) {
            var updateWork = UpdateWorkFactory.create();
            updateWork.survey = WorkspaceService.workspace.project.survey;
            updateWork.target = editingEvent.target;

            if (editingEvent.state.domData)
                updateWork.data = editingEvent.state.domData;

            updateWork.type = editingEvent.type;
            updateWork.model = editingEvent.source.model;

            return updateWork;
        }
    }

}());
