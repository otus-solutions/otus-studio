(function() {
    'use strict';

    angular
        .module('protocolSpecification')
        .factory('UpdaterFactory', UpdaterFactory);

    UpdaterFactory.$inject = ['ModelUpdaterMapService', 'UpdaterMapService'];

    function UpdaterFactory(ModelUpdaterMapService, UpdaterMapService) {
        var self = this;

        /* Public interface */
        self.produceUpdater = produceUpdater;

        function produceUpdater(editingTarget) {
            var updaterName = ModelUpdaterMapService.getUpdaterName(editingTarget),
                updater = UpdaterMapService.getUpdater(updaterName);

            return updater;
        }

        return self;
    }

}());
