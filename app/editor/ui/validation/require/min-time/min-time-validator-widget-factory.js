(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MinTimeValidatorWidgetFactory', MinTimeValidatorWidgetFactory);

    function MinTimeValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MinTimeValidator(scope, element);
        }

        return self;
    }

    function MinTimeValidator(scope, element) {
        var self = this;
        var whoAmI = 'minTime';


        /* Public Methods */
        self.data = moment().hour('01').minute('23').second(0).milliseconds(0).toDate();
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();
        _init();

        function _init() {
          console.log(Date().prototype.getTimezoneOffset());
            var avaiableRules = parent.fillingRules.options;
            if (avaiableRules.hasOwnProperty(whoAmI)) {
              console.log(avaiableRules[whoAmI].data.reference);
              console.log(Date(avaiableRules[whoAmI].data.reference));
                // self.data = Date(avaiableRules[whoAmI].data.reference);
            }
        }

        function updateData() {
          if(self.data){
            console.log(self.data);
            getRuleType().data.reference = self.data;
          }
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
