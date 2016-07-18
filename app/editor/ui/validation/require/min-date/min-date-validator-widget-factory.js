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

        /* Public Methods */
        self.getTemplate = getTemplate;
        self.data = new Date();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var whoAmI = 'minDate'

        var parent = scope.$parent.widget.getItem();

        _init();
        function _init(){
          var avaiableRules = parent.fillingRules.options;
          if (avaiableRules.hasOwnProperty(whoAmI)){
            console.log(new Date(avaiableRules[whoAmI].data.reference.toString()));
            // self.data = avaiableRules[whoAmI].data.reference;
          }

        }

        function updateData() {
            getRuleType().data.reference = self.data;
        }

        function getRuleType() {
            return parent.fillingRules.options[whoAmI];
        }

        function getTemplate() {
            return '<otus:min-date-validator></otus:min-date-validator>';
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());
