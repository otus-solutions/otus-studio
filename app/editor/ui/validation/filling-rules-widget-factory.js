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
            'LowerCaseValidatorWidgetFactory',
            'LowerLimitValidatorWidgetFactory',
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
                futureDate: FutureDateValidatorWidgetFactory,
                in: InValidatorWidgetFactory,
                lowerLimit: LowerLimitValidatorWidgetFactory,
                lowercase: LowerCaseValidatorWidgetFactory,
                maxDate: MaxDateValidatorWidgetFactory,
                maxLength: MaxLengthValidatorWidgetFactory,
                maxTime: MaxTimeValidatorWidgetFactory,
                minDate: MinDateValidatorWidgetFactory,
                minLength: MinLengthValidatorWidgetFactory,
                minTime: MinTimeValidatorWidgetFactory,
                parameter: ParameterValidatorWidgetFactory,
                pastDate: PastDateValidatorWidgetFactory,
                precision: PrecisionValidatorWidgetFactory,
                rangeDate: RangeDateValidatorWidgetFactory,
                scale: ScaleValidatorWidgetFactory,
                specials: SpecialsValidatorWidgetFactory,
                upperCase: UpperCaseValidatorWidgetFactory,
                upperLimit: UpperLimitValidatorWidgetFactory
            }

        function create(validator, scope) {
            return validatorsTemplates[validator].create(scope);
        }


        return self;

    }


}());
