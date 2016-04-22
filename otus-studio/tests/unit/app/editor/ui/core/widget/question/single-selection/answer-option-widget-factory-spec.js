describe('QuestionAnswerOptionEditorWidgetFactory', function() {
    var Mock = {};
    var option;

    beforeEach(function() {
        module('editor.ui');
        module('otusjs');

        inject(function(_$injector_) {
            factory = _$injector_.get('QuestionAnswerOptionEditorWidgetFactory', {
                AnswerOptionFactory: mockAnswerOptionFactory(_$injector_)
            });
        });

        option = factory.create(Mock.model);
    });

    describe('AnswerOptionFactory', function() {

        it('return object should have model', function() {
            expect(option.model).toBe(Mock.model);
        });

        it('return object should have id', function() {
            expect(option.id).toBe(Mock.model.oid);
        });

        it('return object should have esId', function() {
            expect(option.esId).toEqual('single-selection-questionOID-option-oid');
        });

        it('return object should have esTarget', function() {
            expect(option.esTarget).toEqual('survey.question.questionOID.option.oid');
        });

        it('return object should have addButtonTarget', function() {
            expect(option.addButtonTarget).toEqual('survey.question.questionOID.option.');
        });

        it('return object should have removeButtonTarget', function() {
            expect(option.removeButtonTarget).toEqual('survey.question.questionOID.option.oid');
        });
    });

    function mockAnswerOptionFactory($injector) {
        Mock.AnswerOptionFactory = $injector.get('AnswerOptionFactory');
        Mock.model = Mock.AnswerOptionFactory.create('oid', 'questionOID');
    }

});
