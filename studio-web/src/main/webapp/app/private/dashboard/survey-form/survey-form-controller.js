(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .controller('SurveyFormController', SurveyFormController);

    SurveyFormController.$inject = [
        'NewSurveyFormDialogService',
        'DashboardStateService',
        'SurveyEditorService'
    ];

    function SurveyFormController(NewSurveyFormDialogService, ApplicationStateService, SurveyEditorService) {
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
