(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('SpecialsValidatorWidgetFactory', SpecialsValidatorWidgetFactory);

    function SpecialsValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new SpecialsValidator(scope, menuFactory );
        }

        return self;
    }

    function SpecialsValidator(scope, menuFactory ) {
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
            return parent.fillingRules.options['specials'];
        }

        function getTemplate() {
            return '<otus:specials-validator></otus:specials-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('specials');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
