(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .controller('SurveyFormDashboardController', SurveyFormDashboardController);

    SurveyFormDashboardController.$inject = [
        'NewSurveyFormDialogService',
        'DashboardStateService',
        'SurveyEditorService'
    ];

    function SurveyFormDashboardController(NewSurveyFormDialogService, DashboardStateService, SurveyEditorService) {
        var self = this;

        /* Public interface */
        self.startNewSurveyForm = startNewSurveyForm;

        function startNewSurveyForm() {
            NewSurveyFormDialogService.showDialog()
                .onConfirm(function onConfirm(workInitializationData) {
                    SurveyEditorService.startEditor(workInitializationData);
                    DashboardStateService.goToEditor();
                });
        }
    }

}());
