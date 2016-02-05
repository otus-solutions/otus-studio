(function() {

    angular
        .module('core')
        .service('EditingEventHandler', EditingEventHandler);

    function EditingEventHandler() {
        var self = this;

        /* PUblic interface */
        self.handle = handle;

        /* Public interface implementation */
        function handle(data) {
            //EditingService.editData(data);
            console.log('EditingEventHandler.handle()');
        }
    }

}());
