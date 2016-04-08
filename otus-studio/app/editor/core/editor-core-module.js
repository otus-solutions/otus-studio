(function() {
    'use strict';

    angular
        .module('editor.core', [])
        .run(function(TriggerService) {
            TriggerService.loadTriggers();
        });

}());
