(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('RouteFactory', RouteFactory);

    function RouteFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(origin, destination, index) {
            return new Route(origin, destination, index);
        }

        return self;
    }

    function Route(routeOrigin, routeDestination, routeIndex) {
        var self = this;

        self.extents = 'StudioObject';
        self.objectType = 'Route';
        self.name = routeOrigin + '-' + routeDestination + '-' + routeIndex;
        self.origin = routeOrigin;
        self.destination = routeDestination;
        self.index = routeIndex;
        self.conditionSet = {};

        /* Public interface */
        self.getConditionSet = getConditionSet;
        self.addCondition = addCondition;
        self.removeCondition = removeCondition;
        self.getConditionSetSize = getConditionSetSize;
        self.toJson = toJson;

        function getConditionSet() {
            var clone = {};

            for (var property in self.conditionSet) {
                clone[property] = self.conditionSet[property];
            }

            return clone;
        }


        function addCondition(condition) {
            self.conditionSet = self.conditionSet || {};
            self.conditionSet[condition.name] = condition;
        }

        function removeCondition(condition) {
            var conditionName = condition.name || condition;
            delete self.conditionSet[conditionName];

            if (getConditionSetSize() === 0) {
                self.conditionSet = null;
            }
        }

        function getConditionSetSize() {
            if (self.conditionSet) {
                return Object.keys(self.conditionSet).length;
            } else {
                return 0;
            }
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
