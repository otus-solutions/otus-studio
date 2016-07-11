(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinTimeValidatorFactory', MinTimeValidatorFactory);

    function MinTimeValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new MinTimeValidator();
        }

        return self;
    }

    function MinTimeValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = null;

        function getTemplate(){
          return '<otus:min-time-validator></otus:min-time-validator>';
        }
        //TODO
    }

}());
