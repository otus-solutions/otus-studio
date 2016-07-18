(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxTimeValidatorWidgetFactory', MaxTimeValidatorWidgetFactory);

    function MaxTimeValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new MaxTimeValidator(scope, menuFactory );
        }

        return self;
    }

    function MaxTimeValidator(scope, menuFactory ) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = '';
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.reference = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['maxTime'];
        }

        function getTemplate() {
            return '<otus:max-time-validator></otus:max-time-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('maxTime');
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
