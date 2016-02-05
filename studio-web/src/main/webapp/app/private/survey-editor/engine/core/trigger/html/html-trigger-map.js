(function() {

    angular
        .module('core')
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
