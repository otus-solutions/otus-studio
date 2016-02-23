(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('HtmlTriggerMap', HtmlTriggerMap);

    var inject = [
        'AddButtonTriggerService',
        'RemoveButtonTriggerService',
        'InputTextTriggerService',
        'DivEditableTriggerService'
    ];

    HtmlTriggerMap.$inject = inject;

    function HtmlTriggerMap(AddButtonTriggerService, RemoveButtonTriggerService, InputTextTriggerService, DivEditableTriggerService) {
        return {
            AddButtonTriggerService: AddButtonTriggerService,
            RemoveButtonTriggerService: RemoveButtonTriggerService,
            InputTextTriggerService: InputTextTriggerService,
            DivEditableTriggerService: DivEditableTriggerService
        };
    }

}());
