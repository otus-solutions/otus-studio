(function() {

    angular
        .module('editor.ui')
        .controller('EditorToolbarController', EditorToolbarController);

    EditorToolbarController.$inject = [
        'WorkspaceService'
    ];

    function EditorToolbarController(WorkspaceService) {
        var self = this;

        self.a = null;

        /* Public interface */
        self.saveOfflineWork = saveOfflineWork;
        self.exportSurvey = exportSurvey;

        function saveOfflineWork() {
            WorkspaceService.saveWork();
        }

        function exportSurvey() {
            self.a = WorkspaceService.exportWork();
        }
    }

}());
