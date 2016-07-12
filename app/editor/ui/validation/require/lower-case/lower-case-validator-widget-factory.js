(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('LowerCaseValidatorWidgetFactory', LowerCaseValidatorWidgetFactory);

    function LowerCaseValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new LowerCaseValidator();
        }

        return self;
    }

    function LowerCaseValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = false;

        function getTemplate(){
          return '<otus:lower-case-validator></otus:lower-case-validator>';
        }
        //TODO
    }

}());
