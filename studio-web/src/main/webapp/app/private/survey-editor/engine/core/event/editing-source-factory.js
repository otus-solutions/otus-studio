(function() {
    'use strict';

    angular
        .module('core')
        .factory('EditingSourceFactory', API);

    /* Factory interface */
    function API() {
        /*
         * Creates a simple EditingSource instance
         */
        this.create = function create(esComponent, esId, esType, esTarget) {
            return new EditingSource(esComponent, esId, esType, esTarget);
        };

        return this;
    }

    /* EditingSource model used as factory product */
    function EditingSource(esComponent, esId, esType, esTarget) {

        Object.defineProperty(this, 'id', {
            value: esId,
            writable: false
        });

        Object.defineProperty(this, 'component', {
            value: EditingSource.prototype.getComponent(esComponent),
            writable: false
        });

        Object.defineProperty(this, 'type', {
            value: esType,
            writable: false
        });

        Object.defineProperty(this, 'target', {
            value: esTarget,
            writable: false
        });

    }

    EditingSource.prototype.getComponent = function(eventComponent) {
        return eventComponent[0];
    };

}());
