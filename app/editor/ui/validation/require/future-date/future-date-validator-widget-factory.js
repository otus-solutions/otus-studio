(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FutureDateValidatorWidgetFactory', FutureDateValidatorWidgetFactory);

    function FutureDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new FutureDateValidator(scope, menuFactory);
        }

        return self;
    }

    function FutureDateValidator(scope, menuFactory) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = new Date();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();        

        function updateData() {
            getRuleType().data.reference = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['FutureDate'];
        }

        function getTemplate() {
            return '<otus:future-date-validator></otus:future-date-validator>';
        }

        function deleteValidator() {
            menuFactory.deleteValidator('futureDate');
            console.log(self.element);
            self.element.remove();
            self.directiveScope.$destroy();
        }

    }

}());
