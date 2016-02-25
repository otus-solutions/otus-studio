(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .factory('HtmlTriggerMap', HtmlTriggerMap);

    HtmlTriggerMap.$inject = [
        'AddButtonTriggerService',
        'RemoveButtonTriggerService',
        'UpdateButtonTriggerService',
        'InputTextTriggerService',
        'DivEditableTriggerService'
    ];

    function HtmlTriggerMap(AddButtonTriggerService, RemoveButtonTriggerService, UpdateButtonTriggerService, InputTextTriggerService, DivEditableTriggerService) {
        return {
            'AddButtonTriggerService': AddButtonTriggerService,
            'RemoveButtonTriggerService': RemoveButtonTriggerService,
            'UpdateButtonTriggerService': UpdateButtonTriggerService,
            'InputTextTriggerService': InputTextTriggerService,
            'DivEditableTriggerService': DivEditableTriggerService
        };
    }

}());
