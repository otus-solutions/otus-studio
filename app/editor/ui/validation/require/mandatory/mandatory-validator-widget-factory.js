(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MandatoryValidatorWidgetFactory', MandatoryValidatorWidgetFactory);

    function MandatoryValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, menuFactory) {
            return new MandatoryValidator(scope, menuFactory );
        }

        return self;
    }

    function MandatoryValidator(scope, menuFactory ) {
        var self = this;

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = false;
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        function updateData() {
            getRuleType().data.value = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options['mandatory'];
        }

        function getTemplate() {
            return '<otus:mandatory-validator></otus:mandatory-validator>';
        }


    }

}());
