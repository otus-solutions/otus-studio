(function() {
    'use strict';

    angular
        .module('studio.main')
        .controller('SurveyFormsDashboardController', SurveyFormsDashboardController);

    SurveyFormsDashboardController.$inject = [
        'NewSurveyFormDialogService',
        'ApplicationStateService',
        'SurveyEditorService'
    ];

    function SurveyFormsDashboardController(NewSurveyFormDialogService, ApplicationStateService, SurveyEditorService) {
        var self = this;

        /* Public interface */
        self.openEditor = openEditor;

        function openEditor() {
            NewSurveyFormDialogService.showDialog()
                .onConfirm(function onConfirm(data) {
                    SurveyEditorService.startEditor(data);
                    ApplicationStateService.goToEditor();
                });
        }
    }

}());
