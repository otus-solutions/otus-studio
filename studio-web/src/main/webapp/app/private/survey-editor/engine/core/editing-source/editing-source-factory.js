(function() {
    'use strict';

    angular
        .module('editor.engine.core')
        .factory('EditingSourceFactory', EditingSourceFactory);

    /* Factory interface */
    function EditingSourceFactory() {
        var self = this;

        /* Public interface */
        self.produceEditingSource = produceEditingSource;

        /*
         * Creates a simple EditingSource instance
         */
        function produceEditingSource(esComponent, esType, esId, esTarget) {
            return new EditingSource(esComponent, esType, esId, esTarget);
        }

        return self;
    }

    /* EditingSource model used as factory product */
    function EditingSource(esComponent, esType, esId, esTarget) {

        Object.defineProperty(this, 'type', {
            value: esType,
            writable: false
        });

        Object.defineProperty(this, 'id', {
            value: esId,
            writable: false
        });

        Object.defineProperty(this, 'target', {
            value: esTarget,
            writable: false
        });

        Object.defineProperty(this, 'component', {
            value: EditingSource.prototype.getComponent(esComponent),
            writable: false
        });

    }

    EditingSource.prototype.getComponent = function(eventComponent) {
        return eventComponent[0];
    };

}());
