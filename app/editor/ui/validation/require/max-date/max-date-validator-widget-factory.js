(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxDateValidatorWidgetFactory', MaxDateValidatorWidgetFactory);

    function MaxDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MaxDateValidator(scope, element );
        }

        return self;
    }

    function MaxDateValidator(scope, element ) {
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
            return parent.fillingRules.options['maxDate'];
        }

        function getTemplate() {
            return '<otus:max-date-validator></otus:max-date-validator>';
        }
        
        function deleteValidator() {
            scope.$parent.widget.deleteValidator('maxDate');
            element.remove();
            scope.$destroy();
        }

    }

}());
