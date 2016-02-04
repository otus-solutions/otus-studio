(function() {

    angular
        .module('core')
        .service('InputTextEventTriggerService', InputTextEventTriggerService);

    function InputTextEventTriggerService() {

        var self = this;
        self.trigger = null;

        /* Public interface */
        self.init = init;
        self.getTrigger = getTrigger;

        function init() {
            self.trigger = new InputTextEventTrigger();
        }

        function getTrigger() {
            return self.trigger;
        }

    }

    function InputTextEventTrigger() {

        var self = this;

        self.name = 'InputTextEventTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'input.text';

        /* Public interface */
        self.getInstance = getInstance;
        self.watchDomComponent = watchDomComponent;

        function watchDomComponent(domComponent) {
            // var processor = new EventTriggerProcessorFactory(ngModel, 'update-model');

            var jqElement = angular.element(domComponent);

            jqElement.on('focus', function setOnFocus() {
                console.log('input on focus');
            });

            jqElement.on('blur', function setOnBlur() {
                console.log('input on blur');
            });
        }

        function getInstance() {
            return self;
        }

    }

}());
