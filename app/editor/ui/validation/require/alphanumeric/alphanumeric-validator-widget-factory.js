(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('AlphanumericValidatorWidgetFactory', AlphanumericValidatorWidgetFactory);

    function AlphanumericValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new AlphanumericValidator(scope, menuFactory);
        }

        return self;
    }

    function AlphanumericValidator(scope, menuFactory) {
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
            return parent.fillingRules.options['alphanumeric'];
        }

        function getTemplate() {
            return '<otus:alphanumeric-validator></otus:alphanumeric-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('alphanumeric');
            console.log(self.element);
            self.element.remove();
            self.directiveScope.$destroy();
        }
    }

}());
