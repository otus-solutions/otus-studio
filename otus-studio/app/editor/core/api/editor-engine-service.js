(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('EditorEngineService', EditorEngineService);

    EditorEngineService.$inject = [
        'ModelBuilderService',
        'BuildWorkFactory',
        'WorkspaceService'
    ];

    function EditorEngineService(ModelBuilderService, BuildWorkFactory, WorkspaceService) {
        var self = this,
            survey = null;

        /* Public interface */
        self.edit = edit;

        function edit(editingEvent) {
            var work = buildWork(editingEvent);
            var workResult = ModelBuilderService.build(work);

            if (work.type.isAddData() && workResult.status) {
                WorkspaceService.workspace.isdb.dataPool.store(workResult.data);
            }
        }

        function buildWork(editingEvent) {
            var work = BuildWorkFactory.create();

            work.survey = WorkspaceService.workspace.project.survey;
            work.target = editingEvent.target;
            work.type = editingEvent.type;
            work.id = editingEvent.id;

            if (work.type.isPreAddData() || work.type.isPreUpdateData()) {
                var lastSelectEvent = WorkspaceService.workspace.isdb.userEdits.fetchLastSelectEvent();
                work.context = lastSelectEvent.target.split('.')[2];
            }

            if (editingEvent.state.domData) {
                work.data = editingEvent.state.domData;
            }

            if (editingEvent.source.model) {
                work.model = editingEvent.source.model;
                work.questionId = work.survey.identity.acronym + WorkspaceService.getQuestionId();
            }

            return work;
        }
    }

}());
