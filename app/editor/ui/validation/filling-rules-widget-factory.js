(function() {
        'use strict';

        angular
            .module('editor.ui')
            .factory('OtusFillingRulesWidgetFactory', OtusFillingRulesWidgetFactory);

        function OtusFillingRulesWidgetFactory() {
            var self = this;

            /* Public interface */
            self.create = create;


            var validatorsTemplates = {
                alphanumeric: '<otus:alphanumeric-validator></otus:alphanumeric-validator>',
                distinct: '<otus:distinct-validator></otus:distinct-validator>',
                futureDate: '<otus:future-date-validator></otus:future-date-validator>',
                in: '<otus:in-validator></otus:in-validator>',
                lowerLimit: '<otus:lower-limit-validator></otus:lower-limit-validator>',
                lowerCase: '<otus:lower-case-validator></otus:lower-case-validator>',
                mandatory: '<otus:mandatory-validator></otus:mandatory-validator>',
                maxDate: '<otus:max-date-validator></otus:max-date-validator>',
                maxLength: '<otus:max-length-validator></otus:max-length-validator>',
                maxTime: '<otus:max-time-validator></otus:max-time-validator>',
                minDate: '<otus:min-date-validator></otus:min-date-validator>',
                minLength: '<otus:min-length-validator></otus:min-length-validator>',
                minTime: '<otus:min-time-validator></otus:min-time-validator>',
                parameter: '<otus:parameter-validator></otus:parameter-validator>',
                pastDate: '<otus:past-date-validator></otus:past-date-validator>',
                precision: '<otus:precision-validator></otus:precision-validator>',
                rangeDate: '<otus:range-date-validator></otus:range-date-validator>',
                scale: '<otus:scale-validator></otus:scale-validator>',
                specials: '<otus:specials-validator></otus:specials-validator>',
                upperCase: '<otus:upper-case-validator></otus:upper-case-validator>',
                upperLimit: '<otus:upper-limit-validator></otus:upper-limit-validator>',
                minSelected: '<otus:min-selected-validator></otus:min-selected-validator>',
                maxSelected: '<otus:max-selected-validator></otus:max-selected-validator>',
                quantity: '<otus:quantity-validator></otus:quantity-validator>'
            };

        function create(validator) {
            return validatorsTemplates[validator];
        }


        return self;

    }


}());
