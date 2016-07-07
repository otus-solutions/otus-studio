(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('LowerLimitValidatorFactory', LowerLimitValidatorFactory);

    function LowerLimitValidatorFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new LowerLimitValidator();
        }

        return self;
    }

    function LowerLimitValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;

        function getTemplate(){
          return '<otus:lower-limit-validator></otus:lower-limit-validator>';
        }
        //TODO
    }

}());
