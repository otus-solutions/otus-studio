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
        self.removeSelectedTemplate = removeSelectedTemplate;
        self.hasSelectedTemplate = hasSelectedTemplate;
        self.selectTemplate = selectTemplate;

        function selectTemplate(template) {
            self.selectedTemplate = template.template;
        }

        function hasSelectedTemplate() {
            return true;
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
        }

    }

})();
