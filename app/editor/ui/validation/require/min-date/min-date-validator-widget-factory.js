(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinDateValidatorWidgetFactory', MinDateValidatorWidgetFactory);

    function MinDateValidatorWidgetFactory() {
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
        self.date = new Date();

        function getTemplate(){
          return '<otus:min-date-validator></otus:min-date-validator>';
        }
        //TODO
    }

}());
