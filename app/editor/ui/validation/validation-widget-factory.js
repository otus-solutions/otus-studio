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
                    distinct: '<otus:distinct-validation></otus:distinct-validation>',
                    rangeDate: '<otus:rangeDate-validation></otus:rangeDate-validation>',
                    minDate: '<otus:minDate-validation></otus:minDate-validation>',
                    maxDate: '<otus:maxDate-validation></otus:maxDate-validation>',
                    futureDate: '<otus:futureDate-validation></otus:futureDate-validation>',
                    pastDate: '<otus:pastDate-validation></otus:pastDate-validation>',
                    loweLimit: '<otus:lowerLimit-validation></otus:lowerLimit-validation>',
                    upperLimit: '<otus:upperLimit-validation></otus:upperLimit-validation>',
                    scale: '<otus:scale-validation></otus:scale-validation>',
                    in: '<otus:in-validation></otus:in-validation>',
                    precision: '<otus:precision-validation></otus:precision-validation>',
                    alphanumeric: '<otus:alphanumeric-validation></otus:alphanumeric-validation>',
                    lowercase: '<otus:lowerCase-validation></otus:lowerCase-validation>',
                    upperCase: '<otus:upperCase-validation></otus:upperCase-validation>',
                    minLength: '<otus:minLength-validation></otus:minLength-validation>',
                    maxLength: '<otus:maxLength-validation></otus:maxLength-validation>',
                    specials: '<otus:specials-validation></otus:specials-validation>',
                    minTime: '<otus:minTime-validation></otus:minTime-validation>',
                    maxTime: '<otus:maxTime-validation></otus:maxTime-validation>',
                    parameter: '<otus:parameter-validation></otus:parameter-validation>'
                  }
                    return templatesList[validator];
                }

                return self;

            }


        }());
