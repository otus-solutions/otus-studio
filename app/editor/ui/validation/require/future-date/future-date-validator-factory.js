(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('futureDateValidatorFactory', futureDateValidatorFactory);

    function futureDateValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new futureDateValidator(scope, element);
        }

        return self;
    }

    function futureDateValidator(scope, element) {
        var self = this;
        //TODO
    }


}());
