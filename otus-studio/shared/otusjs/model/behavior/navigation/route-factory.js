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

    function Route(origin, destination, index) {
        var self = this;

        Object.defineProperty(self, 'extends', {
            value: 'StudioObject',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'objectType', {
            value: 'Route',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'name', {
            value: origin.concat('-').concat(destination),
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'origin', {
            value: origin,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(self, 'destination', {
            value: destination,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(self, 'index', {
            value: index,
            writable: false,
            enumerable: true
        });

        /* Public interface */
        self.getConditionSetSize = getConditionSetSize;
        self.addCondition = addCondition;
        self.removeCondition = removeCondition;
        self.toJson = toJson;

        function getConditionSetSize() {
            if (self.conditionSet) {
                return Object.keys(self.conditionSet).length;
            } else {
                return 0;
            }
        }

        function addCondition(condition) {
            self.conditionSet = self.conditionSet || {};
            self.conditionSet[condition.name] = condition;
        }

        function removeCondition(condition) {
            var conditionName = condition.name || condition;
            delete self.conditionSet[conditionName];

            if (getConditionSetSize() === 0) delete self.conditionSet;
        }

        function toJson() {
            var result = {
                name: self.name,
                origin: self.origin,
                destination: self.destination
            };

            if (self.conditionSet) {
                result.conditionSet = {};

                for (var conditionName in self.conditionSet) {
                    result.conditionSet[conditionName] = self.conditionSet[conditionName].toJson().rules;
                }
            }

            return result;
        }
    }

}());
