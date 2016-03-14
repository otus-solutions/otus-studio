describe('BuilderSelectorService', function() {

    beforeEach(function() {
        module('otusjs.modelBuilder');

        inject(function(_$injector_) {
            service = _$injector_.get('BuilderSelectorService');
        });
    });

    describe('getBuilderName method return', function() {
        it('should be equal to LabelBuilderService when parameter match regex: "/survey\.question\.[\d|\w|\-]+\.label/"', function() {
            var actual = service.getBuilderName('survey.question.A1.label');

            expect(actual).toBe('LabelBuilderService');
        });

        it('should be equal to UnitBuilderService when parameter match regex: "/survey\.question\.[\d|\w|\-]+\.unit/"', function() {
            var actual = service.getBuilderName('survey.question.A1.unit');

            expect(actual).toBe('UnitBuilderService');
        });

        it('should be equal to QuestionBuilderService when parameter match regex: "/^survey\.question$/"', function() {
            var actual = service.getBuilderName('survey.question');

            expect(actual).toBe('QuestionBuilderService');
        });

        it('should be equal to QuestionBuilderService when parameter match regex: "/^survey\.question.[\d|\w|\-]+$/"', function() {
            var actual = service.getBuilderName('survey.question.A1');

            expect(actual).toBe('QuestionBuilderService');
        });

        it('should be equal to SurveyIdentityBuilderService when parameter match regex: "/^survey\.identity/"', function() {
            var actual = service.getBuilderName('survey.identity');

            expect(actual).toBe('SurveyIdentityBuilderService');
        });

        it('should be equal to AnswerOptionBuilderService when parameter match regex: "/survey\.question\.[\d|\w|\-]+\.option/"', function() {
            var actual = service.getBuilderName('survey.question.A1.option');

            expect(actual).toBe('AnswerOptionBuilderService');
        });
    });

});
