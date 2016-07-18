(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinDateValidatorWidgetFactory', MinDateValidatorWidgetFactory);

    function MinDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new MinDateValidator(scope, menuFactory);
        }

        return self;
    }

    function MinDateValidator(scope, menuFactory) {
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
            return parent.fillingRules.options['minDate'];
        }

        function getTemplate() {
            return '<otus:min-date-validator></otus:min-date-validator>';
        }

        function deleteValidator() {
          console.log(menuFactory);
            menuFactory.deleteValidator('minDate');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
