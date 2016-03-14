(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('ModelFacadeService', ModelFacadeService);

    ModelFacadeService.$inject = [
        /* Question */
        'QuestionFactory',
        /* Setter */
        'LabelFactory',
        'UnitFactory',
        /* Structure */
        'SurveyFactory',
        'SurveyIdentityFactory'
    ];

    function ModelFacadeService(QuestionFactory, LabelFactory, UnitFactory, SurveyFactory, SurveyIdentityFactory) {
        var self = this;

        /* Public interface */
        self.getQuestionFactory = getQuestionFactory;
        self.getLabelFactory = getLabelFactory;
        self.getUnitFactory = getUnitFactory;
        self.getSurveyFactory = getSurveyFactory;
        self.getSurveyIdentityFactory = getSurveyIdentityFactory;

        function getQuestionFactory() {
            return QuestionFactory;
        }

        function getLabelFactory() {
            return LabelFactory;
        }

        function getUnitFactory() {
            return UnitFactory;
        }

        function getSurveyFactory() {
            return SurveyFactory;
        }

        function getSurveyIdentityFactory() {
            return SurveyIdentityFactory;
        }
    }

}());
