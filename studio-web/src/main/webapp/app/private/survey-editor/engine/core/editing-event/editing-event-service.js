(function() {

    angular
        .module('core')
        .service('EditingEventService', EditingEventService);

    function EditingEventService() {
        var self = this;

        /* PUblic interface */
        self.handle = handle;
        self.update = update;

        /* Public interface implementation */
        function handle(data) {
            //EditingService.editData(data);
            console.log('EditingEventHandler.handle()');
        }

        function update(data) {
            console.log('Ocorreu uma edição!');
            console.log(data);
        }

    }

}());
