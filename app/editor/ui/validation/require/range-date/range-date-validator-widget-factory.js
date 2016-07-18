(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RangeDateValidatorWidgetFactory', RangeDateValidatorWidgetFactory);

    function RangeDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new RangeDateValidator(scope, element);
        }

        return self;
    }

    function RangeDateValidator(scope, element) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = {'initial': new Date(), 'end': new Date()};
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.reference = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['rangeDate'];
        }

        function getTemplate() {
            return '<otus:range-date-validator></otus:range-date-validator>';
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator('rangeDate');
            element.remove();
            scope.$destroy();
        }

    }

}());
