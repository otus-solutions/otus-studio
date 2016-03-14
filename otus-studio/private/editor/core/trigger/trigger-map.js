(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('TriggerMap', TriggerMap);

    TriggerMap.$inject = [
        'HtmlTriggerMap',
        'QuestionTriggerMap'
    ];

    function TriggerMap(HtmlTriggerMap, QuestionTriggerMap) {
        return {
            HtmlTriggerMap: HtmlTriggerMap,
            QuestionTriggerMap: QuestionTriggerMap
        };
    }

}());
