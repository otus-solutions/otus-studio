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
            var propertyNames = Object.getOwnPropertyNames(original);

            propertyNames.forEach(function(propertyName) {
                var property = original[propertyName];
                if (property instanceof Function) {
                    var formattedName = '';
                    if (/^get/.test(propertyName)) {
                        var fl = propertyName.substring(3, 4).toLowerCase();
                        formattedName = fl + propertyName.substring(4);
                    }

                    var value = property();
                    if (value instanceof Object) {
                        var subObj = self.clone(value);
                        clone[formattedName] = subObj;
                    } else {
                        clone[formattedName] = value;
                    }
                } else {
                    clone[propertyName] = original[propertyName];
                }
            });

            console.log(clone);

            return JSON.stringify(clone);
        }
    }

}());
