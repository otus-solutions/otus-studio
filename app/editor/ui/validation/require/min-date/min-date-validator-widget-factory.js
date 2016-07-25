(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinDateValidatorWidgetFactory', MinDateValidatorWidgetFactory);

    function MinDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MinDateValidator(scope, element);
        }

        return self;
    }

    function MinDateValidator(scope, element) {
        var self = this;
        var whoAmI = 'minDate';

        /* Public Methods */
        self.data = new Date().toLocaleDateString();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;


        var parent = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = parent.fillingRules.options;
            if (avaiableRules.hasOwnProperty(whoAmI)) {
                self.data = new Date(avaiableRules[whoAmI].data.reference);
            }
            self.updateData();
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
