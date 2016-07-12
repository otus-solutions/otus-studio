(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('InValidatorWidgetFactory', InValidatorWidgetFactory);

    function InValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new InValidator();
        }

        return self;
    }

    function InValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = [];
        function getTemplate(){
          return '<otus:in-validator></otus:in-validator>';
        }
        //TODO
    }

}());
