(function() {
    'use strict';

    angular
        .module('editor.core')
        .service('TriggerService', TriggerService);

    TriggerService.$inject = ['TriggerRegisterService', 'TriggerMap'];

    function TriggerService(TriggerRegisterService, TriggerMap) {
        var self = this;

        /* Public interface */
        self.loadTriggers = loadTriggers;

        function loadTriggers() {
            for (var submap in TriggerMap) {
                submap = TriggerMap[submap];

                for (var triggerService in submap) {
                    var selectedTriggerService = submap[triggerService];
                    TriggerRegisterService.registerTriggerService(selectedTriggerService);
                }
            }
        }
    }

}());
