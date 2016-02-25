(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('BuildWorkFactory', BuildWorkFactory);

    function BuildWorkFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new BuildWork();
        }

        return self;
    }

    function BuildWork() {
        Object.defineProperty(this, 'survey', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'data', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'type', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'id', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'target', {
            value: null,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(this, 'model', {
            value: null,
            writable: true,
            enumerable: true
        });
    }

}());
