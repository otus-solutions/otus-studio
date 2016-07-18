(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('UpperLimitValidatorWidgetFactory', UpperLimitValidatorWidgetFactory);

    function UpperLimitValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new UpperLimitValidator(scope, menuFactory);
        }

        return self;
    }

    function UpperLimitValidator(scope, menuFactory) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.reference = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['upperLimit'];
        }

        function getTemplate() {
            return '<otus:upper-limit-validator></otus:upper-limit-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('upperLimit');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
