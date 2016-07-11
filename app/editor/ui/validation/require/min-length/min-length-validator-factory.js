(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinLengthValidatorFactory', MinLengthValidatorFactory);

    function MinLengthValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new MinLengthValidator();
        }

        return self;
    }

    function MinLengthValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = null;

        function getTemplate(){
          return '<otus:min-length-validator></otus:min-length-validator>';
        }
        //TODO
    }

}());
