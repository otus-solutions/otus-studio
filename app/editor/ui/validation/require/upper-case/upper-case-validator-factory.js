(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('UpperCaseValidatorFactory', UpperCaseValidatorFactory);

    function UpperCaseValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpperCaseValidator();
        }

        return self;
    }

    function UpperCaseValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:upper-case-validator></otus:upper-case-validator>';
        }
        //TODO
    }

}());
