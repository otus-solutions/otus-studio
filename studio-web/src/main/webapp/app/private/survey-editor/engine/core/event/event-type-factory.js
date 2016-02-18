(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('EventTypeFactory', EventTypeFactory);

    function EventTypeFactory() {
        var self = this;

        var eventTypeMap = {
            'input-text': 'SET_VALUE',
            'add-button': 'ADD_DATA',
            'remove-button': 'REMOVE_DATA',
            'question-editor': 'SELECT_DATA'
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
