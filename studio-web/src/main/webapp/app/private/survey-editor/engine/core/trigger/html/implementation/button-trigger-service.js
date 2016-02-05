(function() {

    angular
        .module('editor.engine.core')
        .service('ButtonTriggerService', ButtonTriggerService);

    function ButtonTriggerService() {
        var self = this;

        self.type = 'html';
        self.source = 'button.button';
        self.init = init;

        function init(element, ngModel) {
            element.on('click', function setOnFocus() {
                // processor.storeNewState(element);
                // processor.run();
                console.log('button click');
            });
        }
    }

}());
