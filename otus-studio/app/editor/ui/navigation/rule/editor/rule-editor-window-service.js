(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('RouteEditorWindow', RouteEditorWindow);

    RouteEditorWindow.$inject = ['$mdDialog'];

    function RouteEditorWindow($mdDialog) {
        var self = this;

        /* Public interface */
        self.show = show;

        init();

        function show() {
            $mdDialog.show(self.dialogSettings);
        }

        function init() {
            self.dialogSettings = {
                parent: angular.element(document.body),
                templateUrl: 'app/editor/ui/navigation/rule/editor/rule-editor.html',
                controller: DialogController,
                controllerAs: 'controller',
                openFrom: '#system-toolbar',
                closeTo: {
                    bottom: 0
                }
            };
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
