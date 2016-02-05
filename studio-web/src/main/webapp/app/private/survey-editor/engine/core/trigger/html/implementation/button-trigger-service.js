(function() {

    angular
        .module('core')
        .service('ButtonTriggerService', ButtonTriggerService);

    function ButtonTriggerService() {
        var self = this;

        self.type = 'html';
        self.source = 'button.button';
        self.init = init;

        function init(element, ngModel) {
            // var processor = new TriggerProcessor(element[0].attributes.action.nodeValue, 'action');

            element.on('click', function setOnFocus() {
                // processor.storeNewState(element);
                // processor.run();
                console.log('button click');
            });
        }
    }

}());
