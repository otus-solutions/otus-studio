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

        /* Public interface */
        self.createRoute = createRoute;
        self.underCondition = underCondition;
        self.question = question;

        /* RouteConditionBuilder proxy */
        self.answerBuilder = {};
        self.answerBuilder.answer = {};
        self.answerBuilder.answer.isEqualTo = isEqualTo;
        self.answerBuilder.answer.isGreaterThan = isGreaterThan;
        self.answerBuilder.answer.isGreaterEqualTo = isGreaterEqualTo;
        self.answerBuilder.answer.isLowerThan = isLowerThan;
        self.answerBuilder.answer.isLowerEqualTo = isLowerEqualTo;
        self.answerBuilder.answer.isBetween = isBetween;
        self.answerBuilder.answer.contains = contains;

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
            currentCondition = RouteConditionBuilderFactory.create();
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

        /* RouteConditionBuilder proxy implementation */
        function question(questionID) {
            return self.answerBuilder;
        }
    }

}());
