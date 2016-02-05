(function() {

    angular
        .module('editor.engine.core')
        .factory('SurveyEventTriggerFactory', ['SurveyEventTriggerService', SurveyEventTriggerFactory]);

    function SurveyEventTriggerFactory(SurveyEventTriggerService) {
        var factory = {
            identifyComponent: function(element) {
                return element.localName;
            },
            identifyType: function(element) {
                return element.type;
            },
            selectEventTrigger: function(component, type, data, ngModel) {
                if (type)
                    SurveyEventTriggerTree['loadSurveyPageEvents'][type](data, ngModel);
                else
                    SurveyEventTriggerTree['loadSurveyPageEvents'](data, ngModel);
            },
            produce: function produce(element, ngModel) {
                SurveyEventTriggerService.init();
            }
        };

        return factory;
    }

}());
