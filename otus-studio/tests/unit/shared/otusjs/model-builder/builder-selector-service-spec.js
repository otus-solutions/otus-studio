describe('BuilderSelectorService', function() {

    beforeEach(function() {
        module('otusjs.modelBuilder');

        inject(function(_$injector_) {
            service = _$injector_.get('BuilderSelectorService');
        });
    });

    describe('getBuilderName method return', function() {
        it('should be equal to LabelBuilderService when parameter match regex: "/survey\.questionContainer\.[\d|\w|\-]+\.label/"', function() {
            var actual = service.getBuilderName('survey.questionContainer.A1.label');

            expect(actual).toBe('LabelBuilderService');
        });

        it('should be equal to UnitBuilderService when parameter match regex: "/survey\.questionContainer\.[\d|\w|\-]+\.unit/"', function() {
            var actual = service.getBuilderName('survey.questionContainer.A1.unit');

            expect(actual).toBe('UnitBuilderService');
        });

        it('should be equal to QuestionBuilderService when parameter match regex: "/^survey\.questionContainer$/"', function() {
            var actual = service.getBuilderName('survey.questionContainer');

            expect(actual).toBe('QuestionBuilderService');
        });

        it('should be equal to QuestionBuilderService when parameter match regex: "/^survey\.questionContainer.[\d|\w|\-]+$/"', function() {
            var actual = service.getBuilderName('survey.questionContainer.A1');

            expect(actual).toBe('QuestionBuilderService');
        });

        it('should be equal to SurveyIdentityBuilderService when parameter match regex: "/^survey\.identity/"', function() {
            var actual = service.getBuilderName('survey.identity');

            expect(actual).toBe('SurveyIdentityBuilderService');
        });

        it('should be equal to AnswerOptionBuilderService when parameter match regex: "/survey\.questionContainer\.[\d|\w|\-]+\.option/"', function() {
            var actual = service.getBuilderName('survey.questionContainer.A1.option');

            expect(actual).toBe('AnswerOptionBuilderService');
        });
    });

});
