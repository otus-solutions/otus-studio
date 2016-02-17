(function() {

    angular
        .module('spec')
        .service('ModelService', ModelService);

    ModelService.$inject = ['UpdaterFactory'];

    function ModelService(UpdaterFactory) {
        var self = this;

        /* Public interface */
        self.update = update;

        function update(updateWork) {
            var updater = UpdaterFactory.produceUpdater(updateWork.target);
            updater.update(updateWork);
        }
    }

}());
