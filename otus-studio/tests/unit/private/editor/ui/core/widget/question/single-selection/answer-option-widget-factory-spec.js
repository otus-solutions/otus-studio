describe('QuestionAnswerOptionEditorWidgetFactory', function() {
	var Mock = {};

	beforeEach(function() {
		module('editor.ui');
		module('otusjs');

		inject(function(_$injector_) {
			factory = _$injector_.get('QuestionAnswerOptionEditorWidgetFactory', {
				AnswerOptionFactory : mockAnswerOptionFactory(_$injector_)
			});	
		});	
	});

		describe('AnswerOptionFactory', function() {
			it('return object should have model', function() {
				var option = factory.create(Mock.model);

				expect(option.model).toBe(Mock.model);
			});

			it('return object should have id', function() {
				var option = factory.create(Mock.model);

				expect(option.id).toBe(Mock.model.oid);
			});	

			it('return object should have esId', function() {
				var option = factory.create(Mock.model);
				
				expect(option.esId).toEqual('single-selection-questionOID-option-oid');
			});

			it('return object should have esTarget', function() {
				var option = factory.create(Mock.model);

				expect(option.esTarget).toEqual('survey.question.questionOID.option.oid');
			});

			it('return object should have addButtonTarget', function() {
				var option = factory.create(Mock.model);

				expect(option.addButtonTarget).toEqual('survey.question.questionOID.option.')
			});

			it('return object should have removeButtonTarget', function() {
				var option = factory.create(Mock.model);

				expect(option.removeButtonTarget).toEqual('survey.question.questionOID.option.oid')
			});
		});

	function mockAnswerOptionFactory($injector) {
		Mock.AnswerOptionFactory = $injector.get('AnswerOptionFactory');
		Mock.model = Mock.AnswerOptionFactory.create('oid', 'questionOID');
	}
});