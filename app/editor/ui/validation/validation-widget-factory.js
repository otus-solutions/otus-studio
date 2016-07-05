(function() {
        'use strict';

        angular
            .module('editor.ui')
            .factory('OtusValidationWidgetFactory', OtusValidationWidgetFactory);
            OtusValidationWidgetFactory.$inject = [
              '$compile'
            ];


        function OtusValidationWidgetFactory($compile, scope) {
            var self = this;

            /* Public interface */
            self.validatorsTemplates = validatorsTemplates;  

            function validatorsTemplates(validator) {
                var templatesList = {
                    distinct: '<otus:distinct-validation></otus:distinct-validation>'
                  }
                    return templatesList[validator];
                }

                // <otus:rangeDate-validation></otus:rangeDate-validation>

                //   'CalendarQuestion': ,
                //   'IntegerQuestion': ,
                //   'DecimalQuestion': [],
                //   'SingleSelectionQuestion': [],
                //   'TextQuestion': [],
                //   'TimeQuestion': [],
                //   'EmailQuestion': [],
                //   'PhoneQuestion': [],
                //   'CheckboxQuestion': []
                return self;


            }


        }());
