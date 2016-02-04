(function() {

    angular
        .module('core', [])
        .run(function(EventTriggerTreeService, InputTextEventTriggerService) {
            EventTriggerTreeService.loadTrigger(InputTextEventTriggerService);
        });

}());
