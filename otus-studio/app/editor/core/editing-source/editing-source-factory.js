(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('EditingSourceFactory', EditingSourceFactory);

    /* Factory interface */
    function EditingSourceFactory() {
        var self = this;

        /* Public interface */
        self.produceEditingSource = produceEditingSource;

        /*
         * Creates a simple EditingSource instance
         */
        function produceEditingSource(esComponent, esType, esId, esModel, esTarget) {
            return new EditingSource(esComponent, esType, esId, esModel, esTarget);
        }

        return self;
    }

    /* EditingSource model used as factory product */
    function EditingSource(esComponent, esType, esId, esModel, esTarget) {
        Object.defineProperty(this, 'type', {
            value: esType,
            writable: false
        });

        Object.defineProperty(this, 'id', {
            value: esId,
            writable: false
        });

        Object.defineProperty(this, 'model', {
            value: esModel,
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
