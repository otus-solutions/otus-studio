(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PrecisionValidatorFactory', PrecisionValidatorFactory);

    function PrecisionValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new PrecisionValidator();
        }

        return self;
    }

    function PrecisionValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = null;
        function getTemplate(){
          return '<otus:precision-validator></otus:precision-validator>';
        }
        //TODO
    }

}());
