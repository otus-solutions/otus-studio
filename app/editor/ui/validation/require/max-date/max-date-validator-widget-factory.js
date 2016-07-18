(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxDateValidatorWidgetFactory', MaxDateValidatorWidgetFactory);

    function MaxDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new MaxDateValidator(scope, menuFactory );
        }

        return self;
    }

    function MaxDateValidator(scope, menuFactory ) {
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
            menuFactory.deleteValidator('maxDate');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
