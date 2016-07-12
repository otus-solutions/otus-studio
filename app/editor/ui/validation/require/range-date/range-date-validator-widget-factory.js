(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RangeDateValidatorWidgetFactory', RangeDateValidatorWidgetFactory);

    function RangeDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new RangeDateValidator();
        }

        return self;
    }

    function RangeDateValidator() {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.dateMindate = new Date();
        self.dateMaxdate = new Date();


        function getTemplate(){
          return '<otus:range-date-validator></otus:range-date-validator>';
        }
        //TODO
    }

}());
