(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ScaleValidatorFactory', ScaleValidatorFactory);

    function ScaleValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new ScaleValidator();
        }

        return self;
    }

    function ScaleValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:scale-validator></otus:scale-validator>';
        }
        //TODO
    }

}());
