(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('NewSurveyFormDialogService', NewSurveyFormDialogService);

    NewSurveyFormDialogService.$inject = ['$mdDialog'];

    function NewSurveyFormDialogService($mdDialog) {
        var self = this;

        /* Public interface */
        self.showDialog = showDialog;

        init();

        function init() {
            self.dialogSettings = {
                parent: angular.element(document.body),
                templateUrl: 'private/dashboard/survey-form/dialog/new-survey-form/new-survey-form-dialog.html',
                controller: DialogController,
                controllerAs: 'controller',
                openFrom: '#system-toolbar',
                closeTo: {
                    bottom: 0
                }
            };
        }

        function showDialog() {
            $mdDialog
                .show(self.dialogSettings)
                .then(
                    forwardSuccessfulExecution,
                    forwardUnsuccessfulExecution
                );

            return {
                onConfirm: function onConfirm(callback) {
                    self.callback = callback;
                }
            };
        }

        function forwardSuccessfulExecution(response) {
            if (response.action == 'create') {
                if (self.callback) self.callback(response.data);
            }
        }

        function forwardUnsuccessfulExecution(error) {
            console.log(error);
        }
    }

    function DialogController($mdDialog) {
        var self = this;

        /* Public interface */
        self.cancel = cancel;
        self.createSurveyForm = createSurveyForm;

        function cancel(response) {
            $mdDialog.hide(response);
        }

        function createSurveyForm(response) {
            $mdDialog.hide(response);
        }
    }

}());
