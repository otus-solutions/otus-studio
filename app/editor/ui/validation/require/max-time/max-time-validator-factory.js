(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxTimeValidatorFactory', MaxTimeValidatorFactory);

    function MaxTimeValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new MaxTimeValidator();
        }

        return self;
    }

    function MaxTimeValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = null;

        function getTemplate(){
          return '<otus:max-time-validator></otus:max-time-validator>';
        }
        //TODO
    }

}());
