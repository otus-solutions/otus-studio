(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('LowerLimitValidatorWidgetFactory', LowerLimitValidatorWidgetFactory);

    function LowerLimitValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new LowerLimitValidator(scope, element);
        }

        return self;
    }

    function LowerLimitValidator(scope, element) {
        var self = this;
        var whoAmI = 'lowerLimit';


        /* Public Methods */
        self.data = null;
        self.canBeIgnored = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = question.fillingRules.options[whoAmI].data.reference;
            self.canBeIgnored = question.fillingRules.options[whoAmI].data.canBeIgnored;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            getRuleType().data.canBeIgnored = self.canBeIgnored;
            scope.$parent.widget.updateFillingRules();
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
