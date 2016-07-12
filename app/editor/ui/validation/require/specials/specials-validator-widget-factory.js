(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SpecialsValidatorWidgetFactory', SpecialsValidatorWidgetFactory);

    function SpecialsValidatorWidgetFactory() {
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
        self.answer = false;

        function getTemplate(){
          return '<otus:specials-validator></otus:specials-validator>';
        }
        //TODO
    }

}());
