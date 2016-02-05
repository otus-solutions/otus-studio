(function() {

    angular
        .module('core')
        .factory('TriggerMap', TriggerMap);

    TriggerMap.$inject = ['HtmlTriggerMap'];

    function TriggerMap(HtmlTriggerMap) {
        return {
            HtmlTriggerMap: HtmlTriggerMap
        };
    }

}());
