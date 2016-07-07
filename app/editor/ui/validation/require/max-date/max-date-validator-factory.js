(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxDateValidatorFactory', MaxDateValidatorFactory);

    function MaxDateValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new MaxDateValidator();
        }

        return self;
    }

    function MaxDateValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:max-date-validator></otus:max-date-validator>';
        }
        //TODO
    }

}());
