(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxLengthValidatorFactory', MaxLengthValidatorFactory);

    function MaxLengthValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new MaxLengthValidator();
        }

        return self;
    }

    function MaxLengthValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:max-length-validator></otus:max-length-validator>';
        }
        //TODO
    }

}());
