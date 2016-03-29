(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .factory('RouteConditionBuilderFactory', RouteConditionBuilderFactory);

    RouteConditionBuilderFactory.$inject = [
        'RuleFactory',
        'RouteConditionFactory'
    ];

    function RouteConditionBuilderFactory(RuleFactory, RouteConditionFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RouteConditionBuilder(RuleFactory, RouteConditionFactory);
        }

        return self;
    }

    function RouteConditionBuilder(RuleFactory, RouteConditionFactory) {
        var self = this;
        var rulesToFlush = [];
        var currentCondition;
        var currentRule;
        var currentRuleSubject;

        /* Public interface */
        self.question = question;
        self.build = build;

        /* Answer interface */
        self.answer = {};
        self.answer.isEqualTo = isEqualTo;
        self.answer.isGreaterThan = isGreaterThan;
        self.answer.isGreaterEqualTo = isGreaterEqualTo;
        self.answer.isLowerThan = isLowerThan;
        self.answer.isLowerEqualTo = isLowerEqualTo;
        self.answer.isBetween = isBetween;
        self.answer.contains = contains;

        /* And interface */
        self.andBuilder = {};
        self.andBuilder.question = self.question;
        self.andBuilder.answer = self.answer;
        self.andBuilder.build = build;
        self.and = and;

        /* Or interface */
        self.orBuilder = {};
        self.orBuilder.question = self.question;
        self.orBuilder.answer = self.answer;
        self.or = or;

        createNewCondition();

        function question(ruleSubject) {
            createNewRule(ruleSubject);
            return self;
        }

        function isEqualTo(value) {
            currentRule.equal(value);
            addRuleToFlush(currentRule);
            return self;
        }

        function isGreaterThan(value) {
            currentRule.greater(value);
            addRuleToFlush(currentRule);
            return self;
        }

        function isGreaterEqualTo(value) {
            currentRule.greaterEqual(value);
            addRuleToFlush(currentRule);
            return self;
        }

        function isLowerThan(value) {
            currentRule.lower(value);
            addRuleToFlush(currentRule);
            return self;
        }

        function isLowerEqualTo(value) {
            currentRule.lowerEqual(value);
            addRuleToFlush(currentRule);
            return self;
        }

        function isBetween(start, end) {
            currentRule.between(start, end);
            addRuleToFlush(currentRule);
            return self;
        }

        function contains(value) {
            currentRule.contains(value);
            addRuleToFlush(currentRule);
            return self;
        }

        function and() {
            createNewRule(currentRule.when);
            return self.andBuilder;
        }

        function or() {
            // currentCondition.addRule(currentRule);
            createNewCondition();
            return self.orBuilder;
        }

        function build(conditionName) {
            if (!conditionName) {
                return null;
            } else {
                flushRules();
                currentCondition.name = conditionName;
                return currentCondition;
            }
        }

        function createNewCondition() {
            currentCondition = RouteConditionFactory.create('');
        }

        function createNewRule(ruleSubject) {
            currentRule = RuleFactory.create(ruleSubject);
        }

        function addRuleToFlush(rule) {
            var clone = cloneRule(rule);
            rulesToFlush.push(clone);
        }

        function flushRules() {
            rulesToFlush.forEach(function(rule) {
                currentCondition.addRule(rule);
            });

            rulesToFlush = [];
        }

        function cloneRule(rule) {
            var clone = {};

            Object.keys(rule).forEach(function(property) {
                clone[property] = rule[property];
            });

            return clone;
        }

    }

}());
