(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('LowerLimitValidatorWidgetFactory', LowerLimitValidatorWidgetFactory);

    function LowerLimitValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new LowerLimitValidator(scope);
        }

        return self;
    }

    function LowerLimitValidator(scope) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.answer = null;
        //
        // var parent = scope.$parent.widget.getItem();
        //
        // function updateData() {
        //     getRuleType().data.value = self.answer;
        // }
        //
        // function getRuleType() {
        //     return parent.fillingRules.options['lowerLimit'];
        // }

        function getTemplate(){
          return '<otus:lower-limit-validator></otus:lower-limit-validator>';
        }
        //TODO
    }

}());
