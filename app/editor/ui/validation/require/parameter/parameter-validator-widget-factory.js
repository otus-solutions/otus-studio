(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ParameterValidatorWidgetFactory', ParameterValidatorWidgetFactory);

    function ParameterValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new ParameterValidator(scope, menuFactory );
        }

        return self;
    }

    function ParameterValidator(scope, menuFactory ) {
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
            return parent.fillingRules.options['parameter'];
        }

        function getTemplate() {
            return '<otus:parameter-validator></otus:parameter-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('parameter');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
