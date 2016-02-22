(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('EventTypeFactory', EventTypeFactory);

    function EventTypeFactory() {
        var self = this;

        var eventTypeMap = {
            'input-text': 'SET_DATA',
            'div-editable': 'SET_DATA',
            'add-button': 'ADD_DATA',
            'remove-button': 'REMOVE_DATA',
            'question-editor': {
                'click': 'SELECT_DATA',
                'mouseenter': 'TOUCH_DATA',
                'mouseleave': 'UNTOUCH_DATA'
            }
        };

        /* Public interface */
        self.get = get;

        /*
         * Creates a simple EditingEvent instance
         */
        function get(editingSourceType, listener) {
            if (listener)
                return eventTypeMap[editingSourceType][listener];
            else
                return eventTypeMap[editingSourceType];
        }

        return this;
    }

}());
