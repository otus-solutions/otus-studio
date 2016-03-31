(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('RuleFactory', RuleFactory);

    function RuleFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(when) {
            return new Rule(when);
        }

        return self;
    }

    function Rule(when) {
        var self = this;
        var operator;

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

        Object.defineProperty(self, 'when', {
            value: when,
            writable: true,
            enumerable: true
        });

        /* Public interface */
        self.within = within;
        self.equal = equal;
        self.greater = greater;
        self.greaterEqual = greaterEqual;
        self.lower = lower;
        self.lowerEqual = lowerEqual;
        self.between = between;
        self.contains = contains;
        self.toJson = toJson;

        function within(arrayValues) {
            defineAnswer('within', arrayValues);
        }

        function equal(value) {
            defineAnswer('equal', value);
        }

        function greater(value) {
            defineAnswer('greater', value);
        }

        function greaterEqual(value) {
            defineAnswer('greaterEqual', value);
        }

        function lower(value) {
            defineAnswer('lower', value);
        }

        function lowerEqual(value) {
            defineAnswer('lowerEqual', value);
        }

        function between(start, end) {
            if (Array.isArray(start)) {
                defineAnswer('between', start);
            } else {
                defineAnswer('between', [start, end]);
            }
        }

        function contains(value) {
            defineAnswer('contains', value);
        }

        function defineAnswer(ruleOperator, value) {
            operator = ruleOperator;
            self.answer = {};
            self.answer[operator] = value;
        }

        function toJson() {
            var result = {
                when: self.when,
                answer: self.answer
            };

            return result;
        }
    }

}());
