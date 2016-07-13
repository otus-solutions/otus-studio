(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxDateValidatorWidgetFactory', MaxDateValidatorWidgetFactory);

    function MaxDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope) {
            return new MaxDateValidator(scope);
        }

        return self;
    }

    function MaxDateValidator(scope) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.date = new Date();
        self.updateData = updateData;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.value = self.date;
        }

        function getRuleType() {
            return parent.fillingRules.options['maxDate'];
        }

        function getTemplate() {
            return '<otus:max-date-validator></otus:max-date-validator>';
        }
        //TODO
    }

}());
