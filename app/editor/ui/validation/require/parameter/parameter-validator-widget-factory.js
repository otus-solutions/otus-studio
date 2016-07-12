(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ParameterValidatorWidgetFactory', ParameterValidatorWidgetFactory);

    function ParameterValidatorWidgetFactory() {
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
        self.answer = null;
        function getTemplate(){
          return '<otus:parameter-validator></otus:parameter-validator>';
        }
        //TODO
    }

}());
