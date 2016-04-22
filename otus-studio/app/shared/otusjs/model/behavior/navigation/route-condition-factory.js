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

        self.extents = 'StudioObject';
        self.objectType = 'RouteCondition';
        self.name = conditionName;
        self.rules = [];

        self.listRules = listRules;
        self.addRule = addRule;
        self.removeRule = removeRule;
        self.toJson = toJson;

        function listRules() {
            var clone = [];

            self.rules.forEach(function(rule) {
                clone.push(rule);
            });

            return clone;
        }

        function addRule(rule) {
            var ruleNotExist = (self.rules.indexOf(rule) === -1);
            if (ruleNotExist) self.rules.push(rule);
        }

        function removeRule(rule) {
            var indexToRemove = self.rules.indexOf(rule);
            self.rules.splice(indexToRemove, 1);
        }

        function toJson() {
            var json = {
                extents: 'StudioObject',
                objectType: 'RouteCondition',
                name: self.name,
                rules: []
            };

            self.rules.forEach(function(rule) {
                json.rules.push(rule.toJson());
            });

            return JSON.stringify(json).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
        }
    }

}());
