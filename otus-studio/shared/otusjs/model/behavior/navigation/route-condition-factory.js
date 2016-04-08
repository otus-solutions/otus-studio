(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('RouteConditionFactory', RouteConditionFactory);

    function RouteConditionFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(name) {
            return new RouteCondition(name.replace(' ', '_'));
        }

        return self;
    }

    function RouteCondition(conditionName) {

        var self = this;
        var extents;
        var objectType;
        var name;
        var rules;

        init();

        /* Public interface */
        self.getExtents = getExtents;
        self.getObjectType = getObjectType;
        self.getName = getName;
        self.listRules = listRules;
        self.addRule = addRule;
        self.removeRule = removeRule;
        self.toJson = toJson;

        function init() {
            extents = 'StudioObject';
            objectType = 'RouteCondition';
            name = conditionName;
            rules = [];
        }

        function getExtents() {
            return extents;
        }

        function getObjectType() {
            return objectType;
        }

        function getName() {
            return name;
        }

        function listRules() {
            return rules;
        }

        function addRule(rule) {
            var ruleNotExist = (rules.indexOf(rule) === -1);
            if (ruleNotExist) rules.push(rule);
        }

        function removeRule(rule) {
            var indexToRemove = rules.indexOf(rule);
            rules.splice(indexToRemove, 1);
        }

        function toJson() {
            var result = {
                name: name,
                rules: []
            };

            rules.forEach(function(rule) {
                result.rules.push(rule.toJson());
            });

            return result;
        }
    }

}());
