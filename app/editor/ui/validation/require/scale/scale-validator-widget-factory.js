(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ScaleValidatorWidgetFactory', ScaleValidatorWidgetFactory);

    function ScaleValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new ScaleValidator(scope, menuFactory );
        }

        return self;
    }

    function ScaleValidator(scope, menuFactory ) {
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
            return parent.fillingRules.options['scale'];
        }

        function getTemplate() {
            return '<otus:scale-validator></otus:scale-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('scale');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
