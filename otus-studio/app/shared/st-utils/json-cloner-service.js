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

            if (Array.isArray(original) || (original instanceof Function)) {
                return original;
            } else if (original instanceof Object) {
                var propertyNames = Object.getOwnPropertyNames(original);

                propertyNames.forEach(function(propertyName) {
                    var property = original[propertyName];
                    if (property instanceof Function) {
                        var formattedName = '';
                        if (/^get/.test(propertyName)) {
                            var fl = propertyName.substring(3, 4).toLowerCase();
                            formattedName = fl + propertyName.substring(4);
                            var value = property();

                            if (Array.isArray(value)) {
                                var aray = [];
                                value.forEach(function(el) {
                                    var subEl = self.clone(el);
                                    aray.push(subEl);
                                });
                                clone[formattedName] = aray;
                            } else if (value instanceof Object) {
                                var subObj = self.clone(value);
                                clone[formattedName] = subObj;
                            } else {
                                clone[formattedName] = value;
                            }
                        }
                    } else {
                        clone[propertyName] = original[propertyName];
                    }
                });
                return JSON.stringify(clone).replace(/\\/g, '').replace(/"{/g, '{').replace(/\}"/g, '}');
            } else {
                return original;
            }
        }
    }

}());
