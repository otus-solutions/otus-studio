(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('RemoveAnswerOptionEventFactory', RemoveAnswerOptionEventFactory);

    RemoveAnswerOptionEventFactory.$inject = [
        'RemoveAnswerOptionService',
        'SingleSelectionContentService',
        'WorkspaceService'
    ];

    function RemoveAnswerOptionEventFactory(RemoveAnswerOptionService, SingleSelectionContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RemoveAnswerOptionEvent(RemoveAnswerOptionService, SingleSelectionContentService, WorkspaceService);
        }

        return self;
    }

    function RemoveAnswerOptionEvent(RemoveAnswerOptionService, SingleSelectionContentService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var metadata = RemoveAnswerOptionService.execute(data);
            SingleSelectionContentService.unloadOption();
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
