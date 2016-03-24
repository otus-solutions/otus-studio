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
        var conditions = [];
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
        self.and = and;

        /* Or interface */
        self.orBuilder = {};
        self.orBuilder.question = self.question;
        self.orBuilder.answer = self.answer;
        self.or = or;

        createNewCondition();
        createNewRule();

        function question(ruleSubject) {
            currentRuleSubject = ruleSubject;
            rulesToFlush.push(currentRule);
            return self;
        }

        function isEqualTo(value) {
            currentRule.equal(value);
            rulesToFlush.push(currentRule);
            return self;
        }

        function isGreaterThan(value) {
            currentRule.greater(value);
            rulesToFlush.push(currentRule);
            return self;
        }

        function isGreaterEqualTo(value) {
            currentRule.greaterEqual(value);
            rulesToFlush.push(currentRule);
            return self;
        }

        function isLowerThan(value) {
            currentRule.lower(value);
            rulesToFlush.push(currentRule);
            return self;
        }

        function isLowerEqualTo(value) {
            currentRule.lowerEqual(value);
            rulesToFlush.push(currentRule);
            return self;
        }

        function isBetween(start, end) {
            currentRule.between(start, end);
            rulesToFlush.push(currentRule);
            return self;
        }

        function contains(value) {
            currentRule.contains(value);
            rulesToFlush.push(currentRule);
            return self;
        }

        function and() {
            // currentCondition.addRule(currentRule);
            createNewRule();
            return self.andBuilder;
        }

        function or() {
            // currentCondition.addRule(currentRule);
            createNewCondition();
            return self.orBuilder;
        }

        function build() {
            flushRules();
            conditions.push(currentCondition);
            console.log(conditions);
            return conditions;
        }

        function createNewCondition() {
            var conditionName = String(Object.keys(conditions).length);
            currentCondition = RouteConditionFactory.create(conditionName);
        }

        function createNewRule() {
            currentRule = RuleFactory.create(currentRuleSubject);
        }

        function flushRules() {
            rulesToFlush.forEach(function(rule) {
                console.log(rule.toRuleFormat());
                currentCondition.addRule(rule.toRuleFormat());
            });

            console.log(currentCondition);
        }

    }

}());
