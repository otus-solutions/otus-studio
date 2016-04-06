(function() {
    'use strict';

    angular
        .module('otusjs.navigation')
        .factory('RouteBuilderFactory', RouteBuilderFactory);

    RouteBuilderFactory.$inject = [
        'RouteFactory',
        'RouteConditionBuilderFactory'
    ];

    function RouteBuilderFactory(RouteFactory, RouteConditionBuilderFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RouteBuilder(RouteFactory, RouteConditionBuilderFactory);
        }

        return self;
    }

    function RouteBuilder(RouteFactory, RouteConditionBuilderFactory) {
        var self = this;
        var route = null;
        var routeOrigin = null;
        var conditionsToFlush = [];
        var currentCondition;
        var conditionBuilder;

        /* Public interface */
        self.createRoute = createRoute;
        self.underCondition = underCondition;
        self.question = question;
        
        /* RouteConditionBuilder proxy */
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
        self.orBuilder.underCondition = self.underCondition;
        self.orBuilder.question = self.question;
        self.orBuilder.answer = self.answer;
        self.or = or;

        function createRoute() {
            self.from = from;
            return self;
        }

        function from(origin) {
            routeOrigin = origin;
            self.to = to;
            return self;
        }

        function to(destination) {
            route = RouteFactory.create(routeOrigin, destination);
            self.build = build;
            return self;
        }

        function underCondition(conditionName) {
            conditionBuilder = RouteConditionBuilderFactory.create(conditionName);
            return self;
        }

        function question(questionID) {
            conditionBuilder.question(questionID);
            return self;
        }

        function isEqualTo(value) {
            conditionBuilder.answer.isEqualTo(value);
            conditionsToFlush.push(conditionBuilder.build());
            return self;
        }

        function isGreaterThan(value) {
            conditionBuilder.answer.isGreaterThan(value);
            conditionsToFlush.push(conditionBuilder.build());
            return self;
        }

        function isGreaterEqualTo(value) {
            conditionBuilder.answer.isGreaterEqualTo(value);
            conditionsToFlush.push(conditionBuilder.build());
            return self;
        }

        function isLowerThan(value) {
            conditionBuilder.answer.isLowerThan(value);
            conditionsToFlush.push(conditionBuilder.build());
            return self;
        }

        function isLowerEqualTo(value) {
            conditionBuilder.answer.isLowerEqualTo(value);
            conditionsToFlush.push(conditionBuilder.build());
            return self;
        }

        function isBetween(start, end) {
            conditionBuilder.answer.isBetween(value);
            conditionsToFlush.push(conditionBuilder.build());
            return self;
        }

        function contains(value) {
            conditionBuilder.answer.contains(value);
            conditionsToFlush.push(conditionBuilder.build());
            return self;
        }

        function build() {
            flushConditions();
            return route;
        }

        function flushConditions() {
            conditionsToFlush.forEach(function(condition) {
                route.addCondition(condition);
            });
        }

        function and() {
            conditionBuilder.and();
            return self.andBuilder;
        }

        function or() {
            return self.orBuilder;
        }
    }

}());
