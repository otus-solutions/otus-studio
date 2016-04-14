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

    function Rule(whenCase) {

        var self = this;
        var extents;
        var objectType;
        var when;
        var answer;
        var operator;

        init();

        /* Public interface */
        self.getExtents = getExtents;
        self.getObjectType = getObjectType;
        self.getWhen = getWhen;
        self.getAnswer = getAnswer;
        self.within = within;
        self.equal = equal;
        self.greater = greater;
        self.greaterEqual = greaterEqual;
        self.lower = lower;
        self.lowerEqual = lowerEqual;
        self.between = between;
        self.contains = contains;
        self.toJson = toJson;

        function init() {
            extents = 'StudioObject';
            objectType = 'Rule';
            when = whenCase;
            answer = answer;
        }

        function getExtents() {
            return extents;
        }

        function getObjectType() {
            return objectType;
        }

        function getWhen() {
            return when;
        }

        function getAnswer() {
            return answer;
        }

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

        function defineAnswer(operator, value) {
            answer = {};
            answer[operator] = value;
        }

        function toJson() {
            var json = {
                when: when,
                answer: answer
            };

            return JSON.stringify(json).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
        }
    }

}());
