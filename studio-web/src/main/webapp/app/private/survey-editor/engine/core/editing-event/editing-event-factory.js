(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('EditingEventFactory', EditingEventFactory);

    function EditingEventFactory() {
        /*
         * Creates a simple EditingEvent instance
         */
        this.createEditingEvent = function createEditingEvent(editingSource) {
            return new EditingEvent(editingSource);
        };

        return this;
    }

    function EditingEvent(editingSource) {

        Object.defineProperty(this, 'type', {
            value: null,
            writable: false
        });

        Object.defineProperty(this, 'target', {
            value: editingSource.target,
            writable: false
        });

        Object.defineProperty(this, 'modelType', {
            value: null,
            writable: false
        });

        Object.defineProperty(this, 'oldState', {
            value: null,
            writable: false
        });

        Object.defineProperty(this, 'newState', {
            value: null,
            writable: false
        });

    }

}());
