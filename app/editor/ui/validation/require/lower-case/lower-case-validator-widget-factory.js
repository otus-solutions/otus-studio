(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('LowerCaseValidatorWidgetFactory', LowerCaseValidatorWidgetFactory);

    function LowerCaseValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new LowerCaseValidator(scope, element);
        }

        return self;
    }

    function LowerCaseValidator(scope, element) {
        var self = this;
        var whoAmI = 'lowerCase';


        /* Public Methods */
        self.data = true;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = parent.fillingRules.options[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return parent.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());
