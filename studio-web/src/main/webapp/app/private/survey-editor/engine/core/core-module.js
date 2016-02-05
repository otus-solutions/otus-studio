(function() {

    angular
        .module('core', [])
        .run(function(TriggerTreeService) {
            TriggerTreeService.loadTrigger();
        });

}());
