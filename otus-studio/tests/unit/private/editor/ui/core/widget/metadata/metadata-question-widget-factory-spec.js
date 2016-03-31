describe('MetadataQuestionWidgetFactory', function() {
	var Mock = {};

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
			var option = factory.create(Mock.question);

			expect(option.model).toBe(Mock.question.question);
		});
	});

	function mockMetadataAnswerFactory($injector) {
		Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
		Mock.question = Mock.MetadataAnswerFactory.create('oid', 'questionOID')
	}
});