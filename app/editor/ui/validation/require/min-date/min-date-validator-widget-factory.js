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
            return new MinDateValidator(scope, RemoveFillingRulesEventFactory );
        }

        return self;
    }

    function MinDateValidator(scope, RemoveFillingRulesEventFactory ) {
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
            //   return scope.$parent.widget.deleteValidator(getRuleType().validatorType);
            // console.log(getRuleType().validatorType);
            RemoveFillingRulesEventFactory.create().execute(self);
            self.options.splice(-1);
        }
        //TODO
    }

}());
