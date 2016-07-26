(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('DistinctValidatorWidgetFactory', DistinctValidatorWidgetFactory);

    function DistinctValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new DistinctValidator(scope, element);
        }

        return self;
    }

    function DistinctValidator(scope, element) {
        var self = this;
        var whoAmI = 'distinct';


        /* Public Methods */
        self.data;
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
