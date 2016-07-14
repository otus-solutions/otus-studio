(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('UpperCaseValidatorWidgetFactory', UpperCaseValidatorWidgetFactory);

    function UpperCaseValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new UpperCaseValidator(scope, menuFactory );
        }

        return self;
    }

    function UpperCaseValidator(scope, menuFactory ) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = false;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.value = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['upperCase'];
        }

        function getTemplate() {
            return '<otus:upper-case-validator></otus:upper-case-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('upperCase');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
