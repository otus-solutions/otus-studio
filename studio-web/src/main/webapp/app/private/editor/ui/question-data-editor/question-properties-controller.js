(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('QuestionPropertiesController', QuestionPropertiesController);

    QuestionPropertiesController.$inject = ['WorkspaceService', 'QuestionPropertiesContentService'];

    function QuestionPropertiesController(WorkspaceService, QuestionPropertiesContentService) {
        var self = this;

        /* Public interface */
        self.update = update;

        init();

        function init() {
            QuestionPropertiesContentService.registerObserver(self);
        }

        function update(question) {
            self.selectedQuestion = question;

            console.log(self.selectedQuestion);
        }
    }

}());
