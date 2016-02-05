(function() {

    angular
        .module('core')
        .service('InputTextTriggerService', InputTextTriggerService);

    function InputTextTriggerService() {
        var self = this;
        self.trigger = null;

        /* Public interface */
        self.init = init;
        self.getTrigger = getTrigger;

        function init() {
            self.trigger = new InputTextTrigger();
        }

        function getTrigger() {
            return self.trigger;
        }
    }

    function InputTextTrigger() {
        var self = this;

        self.name = 'InputTextTrigger';
        self.tree = 'html';
        self.sourceComponentType = 'input-text';

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
