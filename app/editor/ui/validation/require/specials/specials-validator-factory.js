(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SpecialsValidatorFactory', SpecialsValidatorFactory);

    function SpecialsValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new SpecialsValidator();
        }

        return self;
    }

    function SpecialsValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:specials-validator></otus:specials-validator>';
        }
        //TODO
    }

}());
