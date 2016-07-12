(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('UpperLimitValidatorWidgetFactory', UpperLimitValidatorWidgetFactory);

    function UpperLimitValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpperLimitValidator();
        }

        return self;
    }

    function UpperLimitValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = null;

        function getTemplate(){
          return '<otus:upper-limit-validator></otus:upper-limit-validator>';
        }
        //TODO
    }

}());
