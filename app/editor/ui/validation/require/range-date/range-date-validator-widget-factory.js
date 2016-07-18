(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RangeDateValidatorWidgetFactory', RangeDateValidatorWidgetFactory);

    function RangeDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new RangeDateValidator(scope, menuFactory );
        }

        return self;
    }

    function RangeDateValidator(scope, menuFactory ) {
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
            menuFactory.deleteValidator('rangeDate');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
