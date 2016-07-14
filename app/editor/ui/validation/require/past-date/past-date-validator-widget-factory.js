(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PastDateValidatorWidgetFactory', PastDateValidatorWidgetFactory);

    function PastDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new PastDateValidator(scope, menuFactory );
        }

        return self;
    }

    function PastDateValidator(scope, menuFactory ) {
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
            return parent.fillingRules.options['PastDate'];
        }

        function getTemplate() {
            return '<otus:past-date-validator></otus:past-date-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('PastDate');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
