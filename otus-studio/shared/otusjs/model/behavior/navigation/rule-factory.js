(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('RuleFactory', RuleFactory);

    function RuleFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(name) {
            return new Rule(name);
        }

        return self;
    }

    function Rule(name) {
        var self = this;

        Object.defineProperty(self, 'extends', {
            value: 'StudioObject',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'objectType', {
            value: 'Rule',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'name', {
            value: name,
            writable: true,
            enumerable: true
        });
    }

}());
