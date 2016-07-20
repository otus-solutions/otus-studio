(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('AlphanumericValidatorWidgetFactory', AlphanumericValidatorWidgetFactory);

    function AlphanumericValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new AlphanumericValidator(scope, element);
        }

        return self;
    }

    function AlphanumericValidator(scope, element) {
        var self = this;
        var whoAmI = 'alphanumeric';


        /* Public Methods */
        self.data = true;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = parent.fillingRules.options;
            if (avaiableRules.hasOwnProperty(whoAmI)) {
                self.data = avaiableRules[whoAmI].data.reference;
            }
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
