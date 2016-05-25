(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplate', {
            templateUrl: 'app/dashboard/survey-form/components/survey-template.html',
            controller: SurveyTemplateController,
            require: {
                parent: '^surveyTemplatesList'
            },
            bindings: {
                surveyTemplate: '<'
            }
        });

    SurveyTemplateController.$inject = ['SurveyTemplateManager', '$element'];

    function SurveyTemplateController(SurveyTemplateManager, $element) {
        var self = this;
        self.selectTemplate = selectTemplate;

        function selectTemplate() {
            SurveyTemplateManager.selectTemplate({
                template: self.surveyTemplate
            });
        }


        $element.on('click', function() {
            var mdCard = $element.children();
            if (mdCard.hasClass('selected-template')) {
                mdCard.removeClass('selected-template');
            } else {
                mdCard.addClass('selected-template');
            }
        });


        //console.log('click template: ' +  self.surveyTemplate.template.identity.name);
        //self.parent.logFromParent(self.surveyTemplate.template.identity.name);
        //self.parent.onDelete({template: self.surveyTemplate});


        self.$onDestroy = function() {
            console.log('destroy following template:');
            console.log(self.parent);
        };
    }

})();
