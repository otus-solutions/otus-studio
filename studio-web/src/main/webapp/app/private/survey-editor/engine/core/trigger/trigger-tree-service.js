(function() {

    angular
        .module('core')
        .service('TriggerTreeService', TriggerTreeService);

    TriggerTreeService.$inject = ['TriggerTreeRegisterService'];

    function TriggerTreeService(TriggerTreeRegisterService) {

        var self = this;

        /* Public interface */
        self.loadTrigger = loadTrigger;

        function loadTrigger(triggerService) {
            /*========== DEV LOG ===========*/
            // console.info('Registro de triggers:');
            /*==============================*/

            triggerService.init();
            TriggerTreeRegisterService.registerTrigger(triggerService.getTrigger());

            /*========== DEV LOG ===========*/
            // console.log('Trigger para ' + triggerService.getTrigger().source + ' registrada');
            /*==============================*/
        }

    }

}());
