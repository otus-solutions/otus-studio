(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('DistinctValidatorWidgetFactory', DistinctValidatorWidgetFactory);

    function DistinctValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new DistinctValidator(scope, menuFactory);
        }

        return self;
    }

    function DistinctValidator(scope, menuFactory) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.reference = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['distinct'];
        }

        function getTemplate() {
            return '<otus:distinct-validator></otus:distinct-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('distinct');
            self.element.remove();
            self.directiveScope.$destroy();
        }
    }

}());
