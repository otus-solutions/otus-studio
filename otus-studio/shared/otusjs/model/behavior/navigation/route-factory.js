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

        var extents;
        var objectType;
        var name;
        var origin;
        var destination;
        var index;
        var conditionSet;

        init();

        /* Public interface */
        self.getExtents = getExtents;
        self.getObjectType = getObjectType;
        self.getName = getName;
        self.setName = setName;
        self.getIndex = getIndex;
        self.setIndex = setIndex;
        self.getOrigin = getOrigin;
        self.getDestination = getDestination;
        self.setDestination = setDestination;
        self.getConditionSet = getConditionSet;
        self.addCondition = addCondition;
        self.removeCondition = removeCondition;
        self.getConditionSetSize = getConditionSetSize;
        self.toJson = toJson;

        function init() {
            extents = 'StudioObject';
            objectType = 'Route';
            origin = routeOrigin;
            destination = routeDestination;
            index = routeIndex;
            conditionSet = {};

            setName(getOrigin() + '-' + getDestination());
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

        function setName(value) {
            name = value;
        }

        function getIndex() {
            return index;
        }

        function setIndex(value) {
            index = value;
        }

        function getOrigin() {
            return origin;
        }

        function getDestination() {
            return destination;
        }

        function setDestination(value) {
            destination = value;
        }

        function getConditionSet() {
            var clone = {};

            for (var property in conditionSet) {
                clone[property] = conditionSet[property];
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

            if (getConditionSetSize() === 0) delete self.conditionSet;
        }

        function getConditionSetSize() {
            if (self.conditionSet) {
                return Object.keys(self.conditionSet).length;
            } else {
                return 0;
            }
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
