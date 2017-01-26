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
        self.data;
        self.updateData = updateData;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            console.log("question.fillingRules.options");
            console.log(question.fillingRules.options);

            self.data = question.fillingRules.options[whoAmI].data.reference;
            self.canBeIgnored = question.fillingRules.options[whoAmI].data.canBeIgnored;
        }

        function updateData() {
            getRuleType().data.reference = self.data;
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

    }

}());
