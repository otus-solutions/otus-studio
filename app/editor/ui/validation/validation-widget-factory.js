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
                    distinct: '<otus:distinct-validator></otus:distinct-validator>',
                    futureDate: '<otus:future-date-validator></otus:future-date-validator>',
                    lowerLimit: '<otus:lower-limit-validator></otus:lower-limit-validator>',
                    maxDate: '<otus:max-date-validator></otus:max-date-validator>',
                    maxLength: '<otus:max-length-validator></otus:max-length-validator>',
                    minLength: '<otus:min-length-validator></otus:min-length-validator>',
                    pastDate: '<otus:past-date-validator></otus:past-date-validator>',
                    rangeDate: '<otus:range-date-validator></otus:range-date-validator>',
                    upperLimit: '<otus:upper-limit-validator></otus:upper-limit-validator>',

                    //TODO
                    alphanumeric: '<otus:alphanumeric-validator></otus:alphanumeric-validator>',
                    in: '<otus:in-validator></otus:in-validator>',
                    lowercase: '<otus:lower-case-validator></otus:lower-case-validator>',
                    minDate: '<otus:min-date-validator></otus:min-date-validator>',
                    maxTime: '<otus:max-time-validator></otus:max-time-validator>',
                    minTime: '<otus:min-time-validator></otus:min-time-validator>',
                    precision: '<otus:precision-validator></otus:precision-validator>',
                    scale: '<otus:scale-validator></otus:scale-validator>',
                    specials: '<otus:specials-validator></otus:specials-validator>',
                    parameter: '<otus:parameter-validator></otus:parameter-validator>',
                    upperCase: '<otus:upper-case-validator></otus:upper-case-validator>'
                  }
                    return templatesList[validator];
                }

                return self;

            }


        }());
