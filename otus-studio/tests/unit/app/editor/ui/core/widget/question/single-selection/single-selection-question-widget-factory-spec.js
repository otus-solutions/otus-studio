describe('SingleSelectionQuestionWidgetFactory', function() {
	var Mock = {};
	var prototype = {model : 'model', questionId: 'id', type: 'type'};

	beforeEach(function() {
		module('editor.ui');
		module('otusjs')

		inject(function(_$injector_) {
			factory = _$injector_.get('SingleSelectionQuestionWidgetFactory', {
				AnswerOptionFactory : mockAnswerOptionFactory(_$injector_)
			});	
		});
	});

	describe('SingleSelectionQuestionWidgetFactory', function() {
		it('returned object should model', function() {
			var option = factory.create(prototype);

			expect(option.model).toBe(prototype.model);
		});

		it('returned object should questionId', function() {
			var option = factory.create(prototype);

			expect(option.questionId).toBe(prototype.questionId);
		});

		it('returned object should type', function() {
			var option = factory.create(prototype);
			
			expect(option.type).toBe(prototype.type);
		});
	})

	function mockAnswerOptionFactory($injector) {
		Mock.AnswerOptionFactory = $injector.get('AnswerOptionFactory');
	}
});