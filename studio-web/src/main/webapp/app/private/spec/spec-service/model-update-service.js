(function() {

    angular
        .module('spec')
        .service('ModelService', ModelService);

    ModelService.$inject = ['UpdaterFactory'];

    function ModelService(UpdaterFactory) {
        var self = this;

        /* Public interface */
        self.update = update;

        function update(data, survey) {
            var updater = UpdaterFactory.produceUpdater(data.target);
            updater.update(data, survey);
        }
    }

}());
