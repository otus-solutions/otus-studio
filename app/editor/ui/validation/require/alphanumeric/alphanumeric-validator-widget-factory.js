(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('AlphanumericValidatorWidgetFactory', AlphanumericValidatorWidgetFactory);

    function AlphanumericValidatorWidgetFactory() {
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
        self.answer = false;

        function getTemplate(){
          return '<otus:alphanumeric-validator></otus:alphanumeric-validator>';
        }
        //TODO
    }

}());
