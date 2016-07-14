(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinTimeValidatorWidgetFactory', MinTimeValidatorWidgetFactory);

    function MinTimeValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new MinTimeValidator(scope, menuFactory );
        }

        return self;
    }

    function MinTimeValidator(scope, menuFactory ) {
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
            return parent.fillingRules.options['minTime'];
        }

        function getTemplate() {
            return '<otus:min-time-validator></otus:min-time-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('minTime');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
