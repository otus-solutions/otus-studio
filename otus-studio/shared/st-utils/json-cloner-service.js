(function() {
    'use strict';

    angular
        .module('utils')
        .service('ClonerService', ClonerService);

    function ClonerService() {
        var self = this;

        /* Public interface */
        self.clone = clone;

        function clone(original) {
            var clone = {};

            for (var property in original) {
                clone[property] = original[property];
            }

            return clone;
        }
    }

}());
