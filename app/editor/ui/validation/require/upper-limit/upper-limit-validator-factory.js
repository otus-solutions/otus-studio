(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('UpperLimitValidatorFactory', UpperLimitValidatorFactory);

    function UpperLimitValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpperLimitValidator();
        }

        return self;
    }

    function UpperLimitValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:upper-limit-validator></otus:upper-limit-validator>';
        }
        //TODO
    }

}());
