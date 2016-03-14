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
            var work = buildWork(editingEvent),
                workResult = ModelBuilderService.build(work);

            console.log(workResult);
        }

        function buildWork(editingEvent) {
            var work = BuildWorkFactory.create();

            work.survey = WorkspaceService.workspace.project.survey;
            work.target = editingEvent.target;
            work.type = editingEvent.type;
            work.id = editingEvent.id;

            if (editingEvent.state.domData)
                work.data = editingEvent.state.domData;

            if (editingEvent.source.model) {
                work.model = editingEvent.source.model;
                work.questionId = work.survey.identity.acronym + WorkspaceService.getQuestionId();
            }

            return work;
        }
    }

}());
