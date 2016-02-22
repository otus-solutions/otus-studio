(function() {
    'use strict';

    angular
        .module('otusjs')
        .factory('UnitFactory', UnitFactory);

    function UnitFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new Unit();
        }

        return self;
    }

    function Unit() {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'Unit',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: '',
            writable: false
        });

        self.plainText = '';
        self.formattedText = '';
    }

}());
