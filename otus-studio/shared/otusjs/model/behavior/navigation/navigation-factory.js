(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('NavigationFactory', NavigationFactory);

    function NavigationFactory() {
        var self = this;

        self.create = create;

        function create(origin) {
            return new Navigation(origin);
        }

        return self;
    }

    function Navigation(origin) {
        var self = this;
        var destinations = [];

        Object.defineProperty(self, 'extends', {
            value: 'StudioObject',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'objectType', {
            value: 'Navigation',
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'origin', {
            value: origin,
            writable: false,
            enumerable: true
        });

        /* Public interface */
        self.listDestinations = listDestinations;
        self.addDestination = addDestination;
        self.removeDestination = removeDestination;

        function listDestinations() {
            return destinations;
        }

        function addDestination(destination) {
            destinations.push(destination);
        }

        function removeDestination(to) {
            var destinationToRemove = destinations.filter(function(destination) {
                return destination.to === to;
            });

            var indexToRemove = destinations.indexOf(destinationToRemove[0]);
            if (indexToRemove > -1) destinations.splice(indexToRemove, 1);
        }

    }

}());
