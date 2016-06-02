(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplate', {
            templateUrl: 'app/dashboard/survey-templates/components/survey-template/survey-template.html',
            controller: SurveyTemplateController,
            bindings: {
                surveyTemplate: '<'
            }
        });

    SurveyTemplateController.$inject = [
        '$element',
        '$scope',
        'SelectedSurveyTemplatesManagementService'
    ];

    function SurveyTemplateController($element, $scope, SelectedSurveyTemplatesManagementService) {
        var mdCard;
        var self = this;
        self.isSelected = false;

        self.$onDestroy = function() {
            SelectedSurveyTemplatesManagementService.removeSurveyTemplate(self.surveyTemplate);
        };

        $element.on('click', function() {
            mdCard = $element.children();
            if (!self.isSelected) {
                _select();
            } else {
                _remove();
            }

            _scopeApply();
        });

        function _select() {
            self.isSelected = true;
            mdCard.addClass('selected-template');
            SelectedSurveyTemplatesManagementService.selectSurveyTemplate(self.surveyTemplate);
        }

        function _remove() {
            self.isSelected = false;
            mdCard.removeClass('selected-template');
            SelectedSurveyTemplatesManagementService.removeSurveyTemplate(self.surveyTemplate);
        }

        /**
         * This method calls the AngularJS Digest Cycle
         * It updates all watchers
         */
        function _scopeApply() {
            $scope.$apply();
        }
    }

})();
