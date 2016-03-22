(function() {
    'use strict';

    angular
        .module('otusjs')
        .factory('DestinationFactory', DestinationFactory);

    DestinationFactory.$inject = ['UUID'];

    function DestinationFactory(UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(position) {
            return new Destination(UUID.generateUUID(), position);
        }

        return self;
    }

    function Destination(oid, position) {
        var self = this;

        Object.defineProperty(self, 'extends', {
            value: 'StudioObject',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'objectType', {
            value: 'Destination',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'oid', {
            value: oid,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'position', {
            value: position,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'rule', {
            value: {},
            writable: true,
            enumerable: true
        });

        /* Public interface */
        self.getRulesCount = getRulesCount;
        self.addRule = addRule;
        self.removeRule = removeRule;

        function getRulesCount() {
            return Object.keys(self.rule).length;
        }

        function addRule(rule) {
            self.rule[rule.name] = rule;
        }

        function removeRule(ruleName) {
            delete self.rule[ruleName];
        }
    }

}());
