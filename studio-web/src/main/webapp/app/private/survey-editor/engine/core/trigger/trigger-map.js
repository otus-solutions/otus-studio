(function() {

    angular
        .module('editor.engine.core')
        .factory('TriggerMap', TriggerMap);

    TriggerMap.$inject = ['HtmlTriggerMap'];

    function TriggerMap(HtmlTriggerMap) {
        return {
            HtmlTriggerMap: HtmlTriggerMap
        };
    }

}());
