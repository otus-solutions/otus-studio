(function() {
    'use strict';

    angular
        .module('otusjs')
        .factory('DestinationFactory', DestinationFactory);

    DestinationFactory.$inject = ['UUID', 'ClonerService'];

    function DestinationFactory(UUID, ClonerService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(position) {
            return new Destination(UUID.generateUUID(), position, ClonerService);
        }

        return self;
    }

    function Destination(oid, position, ClonerService) {
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
        self.getRule = getRule;
        self.addRule = addRule;
        self.removeRule = removeRule;

        function getRulesCount() {
            return Object.keys(self.rule).length;
        }

        function getRule(ruleName) {
            var selectedRule = self.rule[ruleName];
            return ClonerService.clone(selectedRule);
        }

        function addRule(rule) {
            self.rule[rule.name] = rule;
        }

        function removeRule(ruleName) {
            delete self.rule[ruleName];
        }

    }

}());
