(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('RouteFactory', RouteFactory);

    function RouteFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(origin, destination) {
            return new Route(origin, destination);
        }

        return self;
    }

    function Route(routeOrigin, routeDestination) {
        var self = this;

        self.extents = 'StudioObject';
        self.objectType = 'Route';
        self.origin = routeOrigin;
        self.destination = routeDestination;
        self.conditionSet = [];
        self.name = routeOrigin + '-' + routeDestination + '-' + self.conditionSet.length;

        /* Public interface */
        self.getConditionSet = getConditionSet;
        self.addCondition = addCondition;
        self.removeCondition = removeCondition;
        self.getConditionSetSize = getConditionSetSize;
        self.toJson = toJson;

        function getConditionSet() {
            var clone = [];

            self.conditionSet.forEach(function(condition) {
                clone.push(condition);
            });

            return clone;
        }

        function getConditionSetSize() {
            return getConditionSet().length;
        }

        function addCondition(condition) {
            self.conditionSet.push(condition);
        }

        function removeCondition(condition) {
            var conditionToRemove = self.conditionSet.filter(function(condition) {
                return condition.name === name;
            });

            var indexToRemove = self.conditionSet.indexOf(conditionToRemove[0]);
            if (indexToRemove > -1) self.conditionSet.splice(indexToRemove, 1);
            return conditionToRemove[0];
        }

        function toJson() {
            var json = {
                extents: self.extents,
                objectType: self.objectType,
                name: self.name,
                origin: self.origin,
                destination: self.destination,
                index: self.index
            };

            if (self.conditionSet) {
                json.conditionSet = {};

                for (var conditionName in self.conditionSet) {
                    json.conditionSet[conditionName] = self.conditionSet[conditionName].toJson();
                }
            }

            return JSON.stringify(json).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
        }
    }

}());
