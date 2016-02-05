(function() {

    angular
        .module('core')
        .service('TriggerTreeService', TriggerTreeService);

    TriggerTreeService.$inject = ['TriggerTreeRegisterService', 'TriggerMap'];

    function TriggerTreeService(TriggerTreeRegisterService, TriggerMap) {
        var self = this;

        /* Public interface */
        self.loadTrigger = loadTrigger;

        function loadTrigger() {
            /*========== DEV LOG ===========*/
            // console.info('Registro de triggers:');
            /*==============================*/

            for (var submap in TriggerMap) {
                submap = TriggerMap[submap];

                for (var triggerService in submap) {
                    triggerService = submap[triggerService];
                    triggerService.init();
                    TriggerTreeRegisterService.registerTrigger(triggerService.getTrigger());
                }
            }

            /*========== DEV LOG ===========*/
            // console.log('Trigger para ' + triggerService.getTrigger().source + ' registrada');
            /*==============================*/
        }
    }

}());
