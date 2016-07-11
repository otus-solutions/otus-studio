(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MandatoryValidatorFactory', MandatoryValidatorFactory);

    function MandatoryValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new MandatoryValidator();
        }

        return self;
    }

    function MandatoryValidator() {
        var self = this;


        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = false;

        function getTemplate(){
          return '<otus:mandatory-validator></otus:mandatory-validator>';
        }
        //TODO
    }

}());
