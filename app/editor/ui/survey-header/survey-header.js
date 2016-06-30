(function() {
    'use strict';

    angular
        .module('editor.ui')
        .component('otusSurveyHeader', {
            templateUrl: 'app/editor/ui/survey-header/survey-header-template.html',

            controller: function(WorkspaceService) {
                var self = this;

                self.name = '';
                self.acronym = '';
                self.identity = {};

                self.$onInit = function() {
                    self.identity = WorkspaceService.getSurvey().identity;
                    self.name = self.identity.name;
                    self.acronym = self.identity.acronym;
                };

            }

        });
}());
