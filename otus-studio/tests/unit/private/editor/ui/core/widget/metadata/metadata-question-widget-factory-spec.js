describe('MetadataQuestionWidgetFactory', function() {
	var Mock = {};
	var question = {questionId: 'id', type: 'type'};

	beforeEach(function() {
		module('editor.ui');
		module('otusjs')

		inject(function(_$injector_) {
			factory = _$injector_.get('MetadataQuestionWidgetFactory', {
				MetadataAnswerFactory : mockMetadataAnswerFactory(_$injector_)
			});
		});
	});

	describe('MetadataQuestionWidgetFactory', function() {
		it('returned object should model', function() {
			var option = factory.create(question);

			expect(option.model).toBe(question);
		});

		it('returned object should questionId', function() {
			var option = factory.create(question);

			expect(option.questionId).toBe(question.questionId);
		});

		it('returned object should type', function() {
			var option = factory.create(question);

			expect(option.type).toBe(question.type);
		});

	});

	function mockMetadataAnswerFactory($injector) {
		Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
	}
});