(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .service('SurveyTemplateManager', SurveyTemplateManager);

    SurveyTemplateManager.$inject = ['CrossSessionDatabaseService'];

    function SurveyTemplateManager(CrossSessionDatabaseService) {
        var self = this;

        self.templatesList = [];
        self.selectedTemplate = {};

        self.getAllTemplates = getAllTemplates;
        self.selectTemplate = selectTemplate;

        self.removeSelectedTemplate = removeSelectedTemplate;
        self.hasSelectedTemplate = hasSelectedTemplate;

        function selectTemplate(template) {
            if (self.selectedTemplate.$$hashKey === template.template.$$hashKey) {
                self.selectedTemplate = {};
            } else {
                self.selectedTemplate = template.template;
            }
        }

        function hasSelectedTemplate() {
            return Object.keys(self.selectedTemplate).length !== 0;
        }

        function getAllTemplates() {
            var promise = CrossSessionDatabaseService.getAllTemplatesRevisionByAuthor();
            promise.then(function(value) {
                self.templatesList = value;
            });
        }

        function removeSelectedTemplate() {
            var idx = self.templatesList.indexOf(self.selectedTemplate);
            if (idx >= 0) {
                self.templatesList.splice(idx, 1);
            }
            cleanSelectedTemplate();
        }

        /**
         *
         * Private Functions
         *
         */

        function cleanSelectedTemplate() {
            self.selectedTemplate = {};
        }


    }

})();
