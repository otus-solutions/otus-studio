(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('HtmlTriggerMap', HtmlTriggerMap);

    HtmlTriggerMap.$inject = [
        'AddButtonTriggerService',
        'PreAddButtonTriggerService',
        'RemoveButtonTriggerService',
        'UpdateButtonTriggerService',
        'InputTextTriggerService',
        'PreInputTextTriggerService',
        'DivEditableTriggerService'
    ];

    function HtmlTriggerMap(AddButtonTriggerService, PreAddButtonTriggerService, RemoveButtonTriggerService, UpdateButtonTriggerService, InputTextTriggerService, PreInputTextTriggerService, DivEditableTriggerService) {
        return {
            'AddButtonTriggerService': AddButtonTriggerService,
            'PreAddButtonTriggerService': PreAddButtonTriggerService,
            'RemoveButtonTriggerService': RemoveButtonTriggerService,
            'UpdateButtonTriggerService': UpdateButtonTriggerService,
            'InputTextTriggerService': InputTextTriggerService,
            'PreInputTextTriggerService': PreInputTextTriggerService,
            'DivEditableTriggerService': DivEditableTriggerService
        };
    }

}());
