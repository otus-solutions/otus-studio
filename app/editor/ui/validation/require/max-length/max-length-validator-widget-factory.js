(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxLengthValidatorWidgetFactory', MaxLengthValidatorWidgetFactory);

    function MaxLengthValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MaxLengthValidator(scope, element);
        }

        return self;
    }

    function MaxLengthValidator(scope, element) {
        var self = this;
        var whoAmI = 'maxLength';


        /* Public Methods */
        self.data = null;
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
