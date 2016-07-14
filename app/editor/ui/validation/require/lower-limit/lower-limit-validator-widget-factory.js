(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('LowerLimitValidatorWidgetFactory', LowerLimitValidatorWidgetFactory);

    function LowerLimitValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new LowerLimitValidator(scope, menuFactory );
        }

        return self;
    }

    function LowerLimitValidator(scope, menuFactory ) {
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
            return parent.fillingRules.options['lowerLimit'];
        }

        function getTemplate() {
            return '<otus:lower-limit-validator></otus:lower-limit-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('lowerLimit');
            console.log(self.element);
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
