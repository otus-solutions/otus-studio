(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxLengthValidatorWidgetFactory', MaxLengthValidatorWidgetFactory);

    function MaxLengthValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new MaxLengthValidator(scope, menuFactory );
        }

        return self;
    }

    function MaxLengthValidator(scope, menuFactory ) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = 0;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.value = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['maxLength'];
        }

        function getTemplate() {
            return '<otus:max-length-validator></otus:max-length-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('maxLength');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
