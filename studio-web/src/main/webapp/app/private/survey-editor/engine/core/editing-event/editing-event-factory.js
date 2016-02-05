(function() {
    'use strict';

    angular
        .module('core')
        .factory('EditingEventFactory', EditingEventFactory);

    function EditingEventFactory() {
        /*
         * Creates a simple EditingEvent instance
         */
        this.create = function create(editingSource) {
            return new EditingEvent(editingSource);
        };

        return this;
    }

    function EditingEvent(source) {

        Object.defineProperty(this, 'type', {
            value: null,
            writable: false
        });

        Object.defineProperty(this, 'target', {
            value: source.target,
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
