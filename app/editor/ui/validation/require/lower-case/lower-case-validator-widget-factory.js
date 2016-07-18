(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('LowerCaseValidatorWidgetFactory', LowerCaseValidatorWidgetFactory);

    function LowerCaseValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new LowerCaseValidator(scope, menuFactory );
        }

        return self;
    }

    function LowerCaseValidator(scope, menuFactory ) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = true;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.reference = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['lowerCase'];
        }

        function getTemplate() {
            return '<otus:lower-case-validator></otus:lower-case-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('lowerCase');
            console.log(self.element);
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
