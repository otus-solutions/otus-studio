(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('ScaleValidatorWidgetFactory', ScaleValidatorWidgetFactory);

    function ScaleValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new ScaleValidator(scope, element);
        }

        return self;
    }

    function ScaleValidator(scope, element) {
        var self = this;
        var whoAmI = 'scale';


        /* Public Methods */
        self.data = null;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            self.data = avaiableRules[whoAmI].data.reference;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
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
