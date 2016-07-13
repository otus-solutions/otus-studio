(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FutureDateValidatorWidgetFactory', FutureDateValidatorWidgetFactory);

    function FutureDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new FutureDateValidator(scope);
        }

        return self;
    }

    function FutureDateValidator(scope) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.date = new Date();
        self.updateData = updateData;

        var parent = scope.$parent.widget.getItem();

        function updateData(){
          getRuleType().data.value = self.date;
        }

        function getRuleType() {
            return parent.fillingRules.options['futureDate'];
        }

        function getTemplate() {
            return '<otus:future-date-validator></otus:future-date-validator>';
        }
        //TODO
    }

}());
