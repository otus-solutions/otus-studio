(function() {
    'use strict';

    angular
        .module('editor.database')
        .service('InsertHelperService', InsertHelperService);

    function InsertHelperService() {
        var self = this;

        /* Public interface */
        self.cloneObject = cloneObject;

        function cloneObject(object) {
            var clone = {};

            Object.keys(object).forEach(function filterProperties(key) {
                var property = object[key];
                if (property instanceof Function) {
                    clone[key] = property;
                }
            });

            return clone;
        }
    }

}());
