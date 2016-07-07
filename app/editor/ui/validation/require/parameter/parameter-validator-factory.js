(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ParameterValidatorFactory', ParameterValidatorFactory);

    function ParameterValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new ParameterValidator();
        }

        return self;
    }

    function ParameterValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:parameter-validator></otus:parameter-validator>';
        }
        //TODO
    }

}());
