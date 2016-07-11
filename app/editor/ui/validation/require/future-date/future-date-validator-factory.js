(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FutureDateValidatorFactory', FutureDateValidatorFactory);

    function FutureDateValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new FutureDateValidator();
        }

        return self;
    }

    function FutureDateValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.date = new Date();

        function getTemplate(){
          return '<otus:future-date-validator></otus:future-date-validator>';
        }
        //TODO
    }

}());
