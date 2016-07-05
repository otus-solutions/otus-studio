(function() {
        'use strict';

        angular
            .module('editor.ui')
            .factory('OtusValidationWidgetFactory', OtusValidationWidgetFactory);


        function OtusValidationWidgetFactory() {
            var self = this;

            /* Public interface */
            self.lalaia = lalaia;

            function lalaia(validator) {
                console.log(_validatorsTemplates(validator));
            }

            function _validatorsTemplates(validator) {
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
