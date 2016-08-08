(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxTimeValidatorWidgetFactory', MaxTimeValidatorWidgetFactory);

    function MaxTimeValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MaxTimeValidator(scope, element);
        }

        return self;
    }

    function MaxTimeValidator(scope, element) {
        var self = this;
        var whoAmI = 'maxTime';


        /* Public Methods */
        self.data = new Date();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var referenceValue = question.fillingRules.options[whoAmI].data.reference;
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
