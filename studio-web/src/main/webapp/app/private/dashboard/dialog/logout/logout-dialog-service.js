(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('LogoutDialogService', LogoutDialogService);

    LogoutDialogService.$inject = ['$mdDialog'];

    function LogoutDialogService($mdDialog) {
        var self = this;

        /* Public interface */
        self.showDialog = showDialog;

        init();

        function init() {
            self.dialogSettings = {
                parent: angular.element(document.body),
                templateUrl: 'private/dashboard/dialog/logout/logout-dialog.html',
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
            if (response.action == 'confirm') {
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
        self.confirm = confirm;

        function cancel(response) {
            $mdDialog.hide(response);
        }

        function confirm(response) {
            $mdDialog.hide(response);
        }
    }

}());
