(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('EventTypeFactory', EventTypeFactory);

    function EventTypeFactory() {
        var self = this;

        var eventTypeMap = {
            'input-text': new EventType('UPDATE_DATA'),
            'div-editable': new EventType('UPDATE_DATA'),
            'add-button': new EventType('ADD_DATA'),
            'remove-button': new EventType('REMOVE_DATA'),
            'update-button': new EventType('UPDATE_DATA'),
            'question-editor': {
                'click': new EventType('SELECT_DATA'),
                'mouseenter': new EventType('TOUCH_DATA'),
                'mouseleave': new EventType('UNTOUCH_DATA')
            }
        };

        /* Public interface */
        self.create = create;

        /*
         * Creates a simple EditingEvent instance
         */
        function create(editingSourceType, listener) {
            if (listener) {
                return eventTypeMap[editingSourceType][listener];
            } else {
                return eventTypeMap[editingSourceType];
            }
        }

        return this;
    }

    function EventType(type) {
        var self = this;

        self.type = type;

        /* Public interface */
        self.isAddData = isAddData;
        self.isRemoveData = isRemoveData;
        self.isUpdateData = isUpdateData;
        self.isSelectData = isSelectData;
        self.isTouchData = isTouchData;
        self.isUntouchData = isUntouchData;

        function isAddData() {
            return (self.type == 'ADD_DATA');
        }

        function isRemoveData() {
            return (self.type == 'REMOVE_DATA');
        }

        function isUpdateData() {
            return (self.type == 'UPDATE_DATA');
        }

        function isSelectData() {
            return (self.type == 'SELECT_DATA');
        }

        function isTouchData() {
            return (self.type == 'TOUCH_DATA');
        }

        function isUntouchData() {
            return (self.type == 'UNTOUCH_DATA');
        }
    }

}());
