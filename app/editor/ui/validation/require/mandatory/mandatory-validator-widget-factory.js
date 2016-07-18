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

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = false;
        self.updateData = updateData;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            console.log(parent);
            parent.fillingRules.options['mandatory']={};
            // getRuleType().data.reference = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['mandatory'];
        }

        function getTemplate() {
            return '<otus:mandatory-validator></otus:mandatory-validator>';
        }


    }

}());
