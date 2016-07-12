(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('UpperCaseValidatorWidgetFactory', UpperCaseValidatorWidgetFactory);

    function UpperCaseValidatorWidgetFactory() {
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
        self.answer = false;

        function getTemplate(){
          return '<otus:upper-case-validator></otus:upper-case-validator>';
        }
        //TODO
    }

}());
