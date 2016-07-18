(function() {
        'use strict';

        angular
            .module('editor.ui')
            .factory('OtusFillingRulesWidgetFactory', OtusFillingRulesWidgetFactory);

        OtusFillingRulesWidgetFactory.$inject = [
            'AlphanumericValidatorWidgetFactory',
            'DistinctValidatorWidgetFactory',
            'FutureDateValidatorWidgetFactory',
            'InValidatorWidgetFactory',
            'LowerLimitValidatorWidgetFactory',
            'LowerCaseValidatorWidgetFactory',
            'MaxDateValidatorWidgetFactory',
            'MaxLengthValidatorWidgetFactory',
            'MaxTimeValidatorWidgetFactory',
            'MinDateValidatorWidgetFactory',
            'MinLengthValidatorWidgetFactory',
            'MinTimeValidatorWidgetFactory',
            'ParameterValidatorWidgetFactory',
            'PastDateValidatorWidgetFactory',
            'PrecisionValidatorWidgetFactory',
            'RangeDateValidatorWidgetFactory',
            'ScaleValidatorWidgetFactory',
            'SpecialsValidatorWidgetFactory',
            'UpperCaseValidatorWidgetFactory',
            'UpperLimitValidatorWidgetFactory'
        ];


        function OtusFillingRulesWidgetFactory(AlphanumericValidatorWidgetFactory, DistinctValidatorWidgetFactory, FutureDateValidatorWidgetFactory, InValidatorWidgetFactory, LowerLimitValidatorWidgetFactory, LowerCaseValidatorWidgetFactory, MaxDateValidatorWidgetFactory, MaxLengthValidatorWidgetFactory, MaxTimeValidatorWidgetFactory, MinDateValidatorWidgetFactory, MinLengthValidatorWidgetFactory, MinTimeValidatorWidgetFactory, ParameterValidatorWidgetFactory, PastDateValidatorWidgetFactory, PrecisionValidatorWidgetFactory, RangeDateValidatorWidgetFactory, ScaleValidatorWidgetFactory, SpecialsValidatorWidgetFactory, UpperCaseValidatorWidgetFactory, UpperLimitValidatorWidgetFactory) {
            var self = this;

            /* Public interface */
            self.create = create;


            var validatorsTemplates = {
                alphanumeric: AlphanumericValidatorWidgetFactory,
                distinct: DistinctValidatorWidgetFactory,
                futureDate: '<otus:future-date-validator></otus:future-date-validator>',
                in: InValidatorWidgetFactory,
                lowerLimit: LowerLimitValidatorWidgetFactory,
                lowerCase: LowerCaseValidatorWidgetFactory,
                maxDate: '<otus:max-date-validator></otus:max-date-validator>',
                maxLength: MaxLengthValidatorWidgetFactory,
                maxTime: MaxTimeValidatorWidgetFactory,
                minDate: '<otus:min-date-validator></otus:min-date-validator>',
                minLength: MinLengthValidatorWidgetFactory,
                minTime: MinTimeValidatorWidgetFactory,
                parameter: ParameterValidatorWidgetFactory,
                pastDate: '<otus:past-date-validator></otus:past-date-validator>',
                precision: PrecisionValidatorWidgetFactory,
                rangeDate: '<otus:range-date-validator></otus:range-date-validator>',
                scale: ScaleValidatorWidgetFactory,
                specials: SpecialsValidatorWidgetFactory,
                upperCase: UpperCaseValidatorWidgetFactory,
                upperLimit: UpperLimitValidatorWidgetFactory
            }

        function create(validator, scope, self) {
            return validatorsTemplates[validator];
        }


        return self;

    }


}());
