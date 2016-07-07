(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('AlphanumericValidatorFactory', AlphanumericValidatorFactory);

    function AlphanumericValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AlphanumericValidator();
        }

        return self;
    }

    function AlphanumericValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:alphanumeric-validator></otus:alphanumeric-validator>';
        }
        //TODO
    }

}());
