(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .factory('NavigationFactory', NavigationFactory);

    NavigationFactory.$inject = ['UUID'];

    function NavigationFactory(UUID) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(origin) {
            return new Navigation(UUID.generateUUID(), origin);
        }

        return self;
    }

    function Navigation(oid, origin) {
        var self = this;

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

        Object.defineProperty(self, 'oid', {
            value: oid,
            writable: false,
            enumerable: true
        });

        Object.defineProperty(self, 'origin', {
            value: origin,
            writable: true,
            enumerable: true
        });

        Object.defineProperty(self, 'destinations', {
            value: {},
            writable: true,
            enumerable: true
        });

        /* Public interface */
        self.getDestinationsCount = getDestinationsCount;
        self.addDestination = addDestination;
        self.removeDestination = removeDestination;

        function getDestinationsCount() {
            return Object.keys(self.destinations).length;
        }

        function addDestination(destination) {
            self.destinations[destination.oid] = destination;
        }

        function removeDestination(destinationID) {
            delete self.destinations[destinationID];
        }
    }

}());
