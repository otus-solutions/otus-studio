(function() {

    angular
        .module('core')
        .service('TriggerTreeService', TriggerTreeService);

    TriggerTreeService.$inject = ['TriggerRegisterService', 'TriggerMap'];

    function TriggerTreeService(TriggerRegisterService, TriggerMap) {
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
                    TriggerRegisterService.registerTrigger(triggerService.getTrigger());
                }
            }

            /*========== DEV LOG ===========*/
            // console.log('Trigger para ' + triggerService.getTrigger().source + ' registrada');
            /*==============================*/
        }
    }

}());
