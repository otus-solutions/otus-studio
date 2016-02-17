(function() {
    'use strict';

    angular
        .module('spec')
        .factory('LabelFactory', LabelFactory);

    function LabelFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new Label();
        }

        return self;
    }

    function Label() {
        var self = this;

        Object.defineProperty(this, 'extends', {
            value: 'StudioObject',
            writable: false
        });

        Object.defineProperty(this, 'objectType', {
            value: 'Label',
            writable: false
        });

        Object.defineProperty(this, 'oid', {
            value: '',
            writable: false
        });

        self.text = '';
    }

}());
