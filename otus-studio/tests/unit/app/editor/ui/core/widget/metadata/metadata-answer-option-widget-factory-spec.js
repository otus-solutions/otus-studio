describe('MetadataAnswerOptionWidgetFactory', function() {
	var Mock = {};

	beforeEach(function() {
		module('editor.ui');
		module('otusjs');

		inject(function(_$injector_) {
			factory = _$injector_.get('MetadataAnswerOptionWidgetFactory', {
				MetadataAnswerFactory : mockMetadataAnswerFactory(_$injector_)
			});
		})
	});

	describe('MetadataAnswerOptionWidgetFactory', function() {
		it('returned object should have model', function() {
			var option = factory.create(Mock.model);

			expect(option.model).toBe(Mock.model);

		});

		it('returned object should have id', function() {
			var option = factory.create(Mock.model);

			expect(option.id).toBe(Mock.model.oid);
		});


		it('returned object should have esId', function() {
			var option = factory.create(Mock.model);

			expect(option.esId).toEqual('metadata-questionOID-option-oid');
		});

		it('return object should have esTarget', function() {
			var option = factory.create(Mock.model);

			expect(option.esTarget).toEqual('survey.question.questionOID.metadata.option.oid');
		});

		it('return object should have addButtonTarget', function() {
			var option = factory.create(Mock.model);

			expect(option.addButtonTarget).toEqual('survey.question.questionOID.metadata.option.');
			
		});

		it('return object should have removeButtonTarget', function() {
			var option = factory.create(Mock.model);

			expect(option.removeButtonTarget).toEqual('survey.question.questionOID.metadata.option.oid')
		});
	});

	 function mockMetadataAnswerFactory($injector) {
    	Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
    	Mock.model = Mock.MetadataAnswerFactory.create('oid', 'questionOID');
    }



});