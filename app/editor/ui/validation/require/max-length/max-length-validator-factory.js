(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxLengthValidatorFactory', MaxLengthValidatorFactory);

    function MaxLengthValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new MaxLengthValidator();
        }

        return self;
    }

    function MaxLengthValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = null;
        self.showMe = showMe;

        function showMe(){
            console.log(self.answer);
        }

        function getTemplate(){
          return '<otus:max-length-validator></otus:max-length-validator>';
        }
        //TODO
    }

}());
