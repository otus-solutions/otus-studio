describe('BuilderMapService', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs.model');
        module('otusjs.modelBuilder');

        inject(function(_$injector_) {
            service = _$injector_.get('BuilderMapService', {
                'SurveyIdentityBuilderService': mockSurveyIdentityBuilderService(_$injector_),
                'QuestionBuilderService': mockQuestionBuilderService(_$injector_),
                'LabelBuilderService': mockLabelBuilderService(_$injector_),
                'UnitBuilderService': mockUnitBuilderService(_$injector_),
                'AnswerOptionBuilderService': mockAnswerOptionBuilderService(_$injector_)
            });
        });
    });

    describe('getBuilder method should return an object', function() {
        it('when parameter is equalt to "SurveyIdentityBuilderService"', function() {
            expect(service.getBuilder('SurveyIdentityBuilderService')).toEqual(Mock.SurveyIdentityBuilderService);
        });

        it('when parameter is equalt to "QuestionBuilderService"', function() {
            expect(service.getBuilder('QuestionBuilderService')).toEqual(Mock.QuestionBuilderService);
        });

        it('when parameter is equalt to "LabelBuilderService"', function() {
            expect(service.getBuilder('LabelBuilderService')).toEqual(Mock.LabelBuilderService);
        });

        it('when parameter is equalt to "UnitBuilderService"', function() {
            expect(service.getBuilder('UnitBuilderService')).toEqual(Mock.UnitBuilderService);
        });

        it('when parameter is equalt to "AnswerOptionBuilderService"', function() {
            expect(service.getBuilder('AnswerOptionBuilderService')).toEqual(Mock.AnswerOptionBuilderService);
        });
    });

    function mockSurveyIdentityBuilderService($injector) {
        Mock.SurveyIdentityBuilderService = $injector.get('SurveyIdentityBuilderService');
        return Mock.SurveyIdentityBuilderService;
    }

    function mockQuestionBuilderService($injector) {
        Mock.QuestionBuilderService = $injector.get('QuestionBuilderService');
        return Mock.QuestionBuilderService;
    }

    function mockLabelBuilderService($injector) {
        Mock.LabelBuilderService = $injector.get('LabelBuilderService');
        return Mock.LabelBuilderService;
    }

    function mockUnitBuilderService($injector) {
        Mock.UnitBuilderService = $injector.get('UnitBuilderService');
        return Mock.UnitBuilderService;
    }

    function mockAnswerOptionBuilderService($injector) {
        Mock.AnswerOptionBuilderService = $injector.get('AnswerOptionBuilderService');
        return Mock.AnswerOptionBuilderService;
    }

});
