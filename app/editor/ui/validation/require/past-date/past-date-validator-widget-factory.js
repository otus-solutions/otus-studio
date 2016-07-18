(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PastDateValidatorWidgetFactory', PastDateValidatorWidgetFactory);

    function PastDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new PastDateValidator(scope, element );
        }

        return self;
    }

    function PastDateValidator(scope, element ) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = new Date();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.reference = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['pastDate'];
        }

        function getTemplate() {
            return '<otus:past-date-validator></otus:past-date-validator>';
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator('pastDate');
            element.remove();
            scope.$destroy();
        }

    }

}());
