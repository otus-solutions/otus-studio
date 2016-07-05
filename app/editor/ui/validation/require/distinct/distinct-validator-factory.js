(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('distinctValidatorFactory', distinctValidatorFactory);

    function distinctValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new DistinctValidator(scope, element);
        }

        return self;
    }

    function DistinctValidator(scope, element) {
        var self = this;

        //TODO
    }

}());
