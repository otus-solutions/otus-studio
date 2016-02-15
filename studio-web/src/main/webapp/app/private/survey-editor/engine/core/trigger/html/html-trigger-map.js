(function() {

    angular
        .module('editor.engine.core')
        .factory('HtmlTriggerMap', HtmlTriggerMap);

    var inject = [
        'ButtonTriggerService',
        'InputTextTriggerService',
        'DivEditableTriggerService'
    ];

    HtmlTriggerMap.$inject = inject;

    function HtmlTriggerMap(ButtonTriggerService, InputTextTriggerService, DivEditableTriggerService) {
        return {
            ButtonTriggerService: ButtonTriggerService,
            InputTextTriggerService: InputTextTriggerService,
            DivEditableTriggerService: DivEditableTriggerService
        };
    }

}());
