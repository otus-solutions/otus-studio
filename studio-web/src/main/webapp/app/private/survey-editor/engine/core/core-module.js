(function() {
    'use strict';

    angular
        .module('editor.engine.core', [])
        .run(function(TriggerService) {
            TriggerService.loadTrigger();
        });

}());
