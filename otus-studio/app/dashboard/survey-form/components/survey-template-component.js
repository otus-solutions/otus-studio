(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplate', {
            templateUrl: 'app/dashboard/survey-form/components/survey-template.html',
            controller: SurveyTemplateController,
            controllerAs: 'controller',
            require: {
                parent: '^surveyTemplatesList'
            },
            bindings: {
                surveyTemplate: '<'
            }
        });

    function SurveyTemplateController($scope, $element, $attrs) {
        var self = this;

        $element.on('click', function() {
            var mdCard = $element.children();
            if (mdCard.hasClass('selected-template')) {
                mdCard.removeClass('selected-template');
            } else {
                mdCard.addClass('selected-template');
                self.parent.SurveyTemplateManager.selectTemplate({template: self.surveyTemplate});
            }
            //console.log('click template: ' +  self.surveyTemplate.template.identity.name);
            //self.parent.logFromParent(self.surveyTemplate.template.identity.name);
            //self.parent.onDelete({template: self.surveyTemplate});
        });

        self.$onDestroy = function() {
            console.log('destroy');
            console.log(self.parent);
        };
    }

})();
