(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('FutureDateValidatorWidgetFactory', FutureDateValidatorWidgetFactory);

    function FutureDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new FutureDateValidator(scope, element);
        }

        return self;
    }

    function FutureDateValidator(scope, element) {
        var self = this;
        var whoAmI = 'futureDate';

        /* Public Methods */
        self.data = new Date();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;


        var parent = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = new Date(parent.fillingRules.options[whoAmI].data.reference);
            updateData();
        }


        function updateData() {
            getRuleType().data.reference = self.data.toLocaleDateString();
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
