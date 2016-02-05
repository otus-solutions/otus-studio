(function() {

    angular
        .module('core', [])
        .run(function(TriggerService) {
            TriggerService.loadTrigger();
        });

}());
