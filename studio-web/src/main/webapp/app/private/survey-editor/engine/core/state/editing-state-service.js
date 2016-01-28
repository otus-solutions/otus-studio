(function() {

    angular
        .module('core')
        .service('EditingState', [EditingState]);

    function EditingState() {
        var self = this;

        /* Public interface */
        self.generateOpen = generateOpen;
        self.generateClose = generateClose;
        self.generateSave = generateSave;

        /* Public interface implementation */
        function generateOpen(data) {
            return createState('OPENED', data);
        }

        function generateClose(data) {
            return createState('CLOSED', data);
        }

        function generateSave(data) {
            return createState('SAVED', data);
        }

        function createState(value, data) {
            return {
                timestamp: Date.now(),
                value: value,
                data: data
            };
        }
    }

}());
