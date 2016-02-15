(function() {
    'use strict';

    angular
        .module('spec')
        .factory('UpdaterFactory', UpdaterFactory);

    UpdaterFactory.$inject = ['TargetToUpdaterMapServer', 'UpdaterMapService'];

    function UpdaterFactory(TargetToUpdaterMapServer, UpdaterMapService) {
        var self = this;

        /* Public interface */
        self.produceUpdater = produceUpdater;

        function produceUpdater(editingTarget) {
            var updaterName = TargetToUpdaterMapServer.getUpdaterName(editingTarget),
                updater = UpdaterMapService.getUpdater(updaterName);

            return updater;
        }

        return self;
    }

}());
