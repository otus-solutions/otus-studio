(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ScaleValidatorWidgetFactory', ScaleValidatorWidgetFactory);

    function ScaleValidatorWidgetFactory() {
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
        self.answer = null;

        function getTemplate(){
          return '<otus:scale-validator></otus:scale-validator>';
        }
        //TODO
    }

}());
