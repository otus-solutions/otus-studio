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
        self.date = false;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.value = self.date;
        }

        function getRuleType() {
            return parent.fillingRules.options['futureDate'];
        }

        function getTemplate() {
            return '<otus:alphanumeric-validator></otus:alphanumeric-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('futureDate');
            console.log(self.element);
            self.element.remove();
            self.directiveScope.$destroy();
        }
    }

}());
