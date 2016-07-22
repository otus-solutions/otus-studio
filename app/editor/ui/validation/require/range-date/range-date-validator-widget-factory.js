(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RangeDateValidatorWidgetFactory', RangeDateValidatorWidgetFactory);

    function RangeDateValidatorWidgetFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new RangeDateValidator(scope, element);
        }

        return self;
    }

    function RangeDateValidator(scope, element) {
        var self = this;
        var whoAmI = 'rangeDate';


        /* Public Methods */
        self.data = {
            'initial': new Date(),
            'end': new Date()
        };
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var parent = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = parent.fillingRules.options;
            if (avaiableRules.hasOwnProperty(whoAmI)) {
                self.data['initial'] = new Date(avaiableRules[whoAmI].data.reference['initial']);
                self.data['end'] = new Date (avaiableRules[whoAmI].data.reference['end']);
            }
        }

        function updateData() {
          getRuleType().data.reference['initial']=self.data['initial'].toLocaleDateString();
          getRuleType().data.reference['end']=self.data['end'].toLocaleDateString();
          console.log(getRuleType().data.reference);            
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
