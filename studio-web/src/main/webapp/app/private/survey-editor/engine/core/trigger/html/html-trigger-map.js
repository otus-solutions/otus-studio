(function() {

    angular
        .module('editor.engine.core')
        .factory('HtmlTriggerMap', HtmlTriggerMap);

    var inject = [
        'ButtonTriggerService',
        'InputTextTriggerService'
    ];

    HtmlTriggerMap.$inject = inject;

    function HtmlTriggerMap(ButtonTriggerService, InputTextTriggerService) {
        return {
            /*ButtonTriggerService: ButtonTriggerService,*/
            InputTextTriggerService: InputTextTriggerService
        };
    }

}());
