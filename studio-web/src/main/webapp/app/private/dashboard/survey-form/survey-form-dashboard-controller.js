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

    function SurveyFormDashboardController(NewSurveyFormDialogService, ApplicationStateService, SurveyEditorService) {
        var self = this;

        /* Public interface */
        self.startNewSurveyForm = startNewSurveyForm;

        function startNewSurveyForm() {
            NewSurveyFormDialogService.showDialog()
                .onConfirm(function onConfirm(data) {
                    SurveyEditorService.startEditor(data);
                    ApplicationStateService.goToEditor();
                });
        }
    }

}());
