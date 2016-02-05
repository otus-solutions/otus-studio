(function() {

    angular
        .module('core', [])
        .run(function(TriggerTreeService, InputTextTriggerService) {
            TriggerTreeService.loadTrigger(InputTextTriggerService);
        });

}());
