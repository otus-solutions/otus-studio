(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinTimeValidatorWidgetFactory', MinTimeValidatorWidgetFactory);

    function MinTimeValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MinTimeValidator(scope, element);
        }

        return self;
    }

    function MinTimeValidator(scope, element) {
        var self = this;
        var whoAmI = 'minTime';


        /* Public Methods */
        self.data = new Date("Fri Mar 25 2015 09:56:24 GMT+0100 (Tokyo Time)");
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var referenceValue = question.fillingRules.options[whoAmI].data.reference;
            self.canBeIgnored = question.fillingRules.options[whoAmI].data.canBeIgnored;
            if (referenceValue !== '') {
              self.data = new Date(referenceValue);
            }
            else {
              self.data.setHours('01');
              self.data.setMinutes('00');
              self.data.setSeconds('00');
              self.data.setMilliseconds('00');
            }
            self.updateData();
        }

        function updateData() {
            if (self.data) {
                getRuleType().data.reference = self.data.toString();
                scope.$parent.widget.updateFillingRules();
            }
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());
