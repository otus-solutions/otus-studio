(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinDateValidatorFactory', MinDateValidatorFactory);

    function MinDateValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new MinDateValidator();
        }

        return self;
    }

    function MinDateValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:min-date-validator></otus:min-date-validator>';
        }
        //TODO
    }

}());
