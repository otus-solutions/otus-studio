(function() {

    angular
        .module('core')
        .factory('HtmlTriggerTreeFactory', HtmlTriggerTreeFactory);

    HtmlTriggerTreeFactory.$inject = ['HtmlTriggerTree'];

    function HtmlTriggerTreeFactory(HtmlTriggerTree) {

        var self = this;

        /* Public interface */
        self.getTrigger = getTrigger;

        function getTrigger(domComponent) {
            return HtmlTriggerTree[domComponent];
        }

        return self;
    }

}());
