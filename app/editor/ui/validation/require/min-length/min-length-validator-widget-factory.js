(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinLengthValidatorWidgetFactory', MinLengthValidatorWidgetFactory);

    function MinLengthValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new MinLengthValidator(scope, menuFactory );
        }

        return self;
    }

    function MinLengthValidator(scope, menuFactory ) {
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
            return parent.fillingRules.options['minLength'];
        }

        function getTemplate() {
            return '<otus:min-length-validator></otus:min-length-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('minLength');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
