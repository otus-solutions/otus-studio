(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MandatoryValidatorWidgetFactory', MandatoryValidatorWidgetFactory);

    function MandatoryValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MandatoryValidator(scope, element);
        }

        return self;
    }

    function MandatoryValidator(scope, element) {
        var self = this;
        var whoAmI = 'mandatory';

        /* Public Methods */
        self.data = false;
        self.updateData = updateData;

        var parent = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = parent.fillingRules.options;
            if (avaiableRules.hasOwnProperty(whoAmI)) {
                console.log(avaiableRules[whoAmI].data);
                self.data = avaiableRules[whoAmI].data.reference;
            }
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            console.log(getRuleType().data);
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return parent.fillingRules.options[whoAmI];
        }

    }

}());
