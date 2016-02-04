(function() {

    angular
        .module('core')
        .service('EventTriggerTreeService', EventTriggerTreeService);

    EventTriggerTreeService.$inject = ['EventTriggerTreeRegister'];

    function EventTriggerTreeService(EventTriggerTreeRegister) {

        var self = this;

        /* Public interface */
        self.loadTrigger = loadTrigger;

        function loadTrigger(triggerService) {
            /*========== DEV LOG ===========*/
            // console.info('Registro de triggers:');
            /*==============================*/

            triggerService.init();
            EventTriggerTreeRegister.registerEventTrigger(triggerService.getTrigger());

            /*========== DEV LOG ===========*/
            // console.log('Trigger para ' + triggerService.getTrigger().source + ' registrada');
            /*==============================*/
        }

    }

}());
