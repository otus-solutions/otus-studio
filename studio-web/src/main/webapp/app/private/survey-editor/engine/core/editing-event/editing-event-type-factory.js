(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('EditingEventTypeFactory', EditingEventTypeFactory);

    function EditingEventTypeFactory() {
        var self = this;

        var eventTypeMap = {
            'input-text': 'SET_VALUE'
        };

        /* Public interface */
        self.get = get;

        /*
         * Creates a simple EditingEvent instance
         */
        function get(editingSourceType) {
            return eventTypeMap[editingSourceType];
        }

        return this;
    }

}());
