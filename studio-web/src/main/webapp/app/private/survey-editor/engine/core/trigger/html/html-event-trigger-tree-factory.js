(function() {

    angular
        .module('core')
        .factory('HtmlEventTriggerTreeFactory', HtmlEventTriggerTreeFactory);

    HtmlEventTriggerTreeFactory.$inject = ['HtmlTriggerTree'];

    function HtmlEventTriggerTreeFactory(HtmlTriggerTree) {

        var self = this;

        /* Public interface */
        self.getTrigger = getTrigger;

        function getTrigger(domComponent) {
            return HtmlTriggerTree[domComponent];
        }

        return self;
    }

}());
