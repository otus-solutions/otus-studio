(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusValidationWidgetFactory', OtusValidationWidgetFactory);
    OtusValidationWidgetFactory.$inject = [
        'AlphanumericValidatorFactory',
        'DistinctValidatorFactory',
        'FutureDateValidatorFactory',
        'InValidatorFactory',
        'LowerLimitValidatorFactory',
        'LowerCaseValidatorFactory',
        'MaxDateValidatorFactory',
        'MaxLengthValidatorFactory',
        'MaxTimeValidatorFactory',
        'MinDateValidatorFactory',
        'MinLengthValidatorFactory',
        'MinTimeValidatorFactory',
        'ParameterValidatorFactory',
        'PastDateValidatorFactory',
        'PrecisionValidatorFactory',
        'RangeDateValidatorFactory',
        'ScaleValidatorFactory',
        'SpecialsValidatorFactory',
        'UpperCaseValidatorFactory',
        'UpperLimitValidatorFactory'
    ];


    function OtusValidationWidgetFactory(AlphanumericValidatorFactory, DistinctValidatorFactory, FutureDateValidatorFactory, InValidatorFactory, LowerLimitValidatorFactory, LowerCaseValidatorFactory, MaxDateValidatorFactory, MaxLengthValidatorFactory, MaxTimeValidatorFactory, MinDateValidatorFactory, MinLengthValidatorFactory, MinTimeValidatorFactory, ParameterValidatorFactory, PastDateValidatorFactory, PrecisionValidatorFactory, RangeDateValidatorFactory, ScaleValidatorFactory, SpecialsValidatorFactory, UpperCaseValidatorFactory, UpperLimitValidatorFactory) {
        var self = this;

        /* Public interface */
        self.validatorsTemplates = validatorsTemplates;

        function validatorsTemplates(validator) {
            var templatesList = {
                alphanumeric: AlphanumericValidatorFactory,
                distinct: DistinctValidatorFactory,
                futureDate: FutureDateValidatorFactory,
                in: InValidatorFactory,
                lowerLimit: LowerLimitValidatorFactory,
                lowercase: LowerCaseValidatorFactory,
                maxDate: MaxDateValidatorFactory,
                maxLength: MaxLengthValidatorFactory,
                maxTime: MaxTimeValidatorFactory,
                minDate: MinDateValidatorFactory,
                minLength: MinLengthValidatorFactory,
                minTime: MinTimeValidatorFactory,
                parameter: ParameterValidatorFactory,
                pastDate: PastDateValidatorFactory,
                precision: PrecisionValidatorFactory,
                rangeDate: RangeDateValidatorFactory,
                scale: ScaleValidatorFactory,
                specials: SpecialsValidatorFactory,
                upperCase: UpperCaseValidatorFactory,
                upperLimit: UpperLimitValidatorFactory
            }
            return templatesList[validator];
        }

        /* Public interface */
        self.create = create;
        // function create(scope, element, validator) {
        function create(validator) {
            return validatorsTemplates(validator).create();
        }


        return self;

    }


}());
