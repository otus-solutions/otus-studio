(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('PrecisionValidatorWidgetFactory', PrecisionValidatorWidgetFactory);

    function PrecisionValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new PrecisionValidator(scope, menuFactory );
        }

        return self;
    }

    function PrecisionValidator(scope, menuFactory ) {
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
            return parent.fillingRules.options['precision'];
        }

        function getTemplate() {
            return '<otus:precision-validator></otus:precision-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('precision');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
