(function() {

    angular
        .module('core')
        .service('EditingEventHandler', ['EditingService', EditingEventHandler]);

    function EditingEventHandler(EditingService) {
        var self = this;

        /* PUblic interface */
        self.handle = handle;

        /* Public interface implementation */
        function handle(data) {
            EditingService.editData(data);
        }
    }

}());
