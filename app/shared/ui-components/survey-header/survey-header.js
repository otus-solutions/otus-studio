(function() {
    'use strict';

    angular
        .module('ui.components')
        .component('surveyHeader', {
            templateUrl: 'app/shared/ui-components/survey-header/survey-header-template.html',

            controller: function($scope, WorkspaceService) {
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
