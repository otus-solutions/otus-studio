(function() {

    angular
        .module('editor.ui')
        .controller('EditorToolbarController', EditorToolbarController);

    EditorToolbarController.$inject = [
        'WorkspaceService'
    ];

    function EditorToolbarController(WorkspaceService) {
        var self = this;

        /* Public interface */
        self.saveOfflineWork = saveOfflineWork;
        self.isSurveyEmpty = isSurveyEmpty;

        function saveOfflineWork() {
            WorkspaceService.saveWork();
        }

        function isSurveyEmpty() {
            return WorkspaceService.getSurvey().questionsCount() === 0 ? true : false;
        }
    }

}());
