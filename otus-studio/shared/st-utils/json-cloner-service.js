(function() {
    'use strict';

    angular
        .module('utils')
        .service('JsonClonerService', JsonClonerService);

    function JsonClonerService() {
        var self = this;

        var internal = 1;

        /* Public interface */
        self.clone = clone;

        function clone(original) {
            var clone = {};
            var propertyNames = filterOnlyProperties(original);

            propertyNames.forEach(function(property) {
                clone[property] = original[property];
            });

            return JSON.stringify(clone);
        }

        function filterOnlyProperties(obj) {
            return Object.getOwnPropertyNames(obj).filter(function(p) {
                return !(obj[p] instanceof Function);
            });
        }
    }

}());
