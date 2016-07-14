(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinDateValidatorWidgetFactory', MinDateValidatorWidgetFactory);

    MinDateValidatorWidgetFactory.$inject = [
        'RemoveFillingRulesEventFactory'
    ];

    function MinDateValidatorWidgetFactory(RemoveFillingRulesEventFactory ) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new MinDateValidator(scope, menuFactory, RemoveFillingRulesEventFactory );
        }

        return self;
    }

    function MinDateValidator(scope, menuFactory, RemoveFillingRulesEventFactory ) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.date = new Date();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.value = self.date;
        }

        function getRuleType() {
            return parent.fillingRules.options['minDate'];
        }

        function getTemplate() {
            return '<otus:min-date-validator></otus:min-date-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('minDate');
            console.log(self.element);
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
