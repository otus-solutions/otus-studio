(function() {
    'use strict';

    angular
        .module('core')
        .factory('EditingSourceFactory', EditingSourceFactory);

    /* Factory interface */
    function EditingSourceFactory() {
        var self = this;

        /*
         * Creates a simple EditingSource instance
         */
        self.produce = function produce(esComponent, esId, esType, esTarget) {
            return new EditingSource(esComponent, esId, esType, esTarget);
        };

        return self;
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
