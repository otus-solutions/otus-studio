describe('MetadataBuilderService', function(){
	var Mock = {};
	var work = 'work';

	beforeEach(function() {
		module('otusjs');

		inject(function(_$injector_) {
			service = _$injector_.get('MetadataAnswerBuilderService', {
				MetadataAnswerFactory : mockMetadataAnswerFactory(_$injector_)

			});
		});

	});

	describe('Part of code manage test scenario', function() {

		it('Test if variable work returned true', function() {
			service.runValidations();

			var work = service.getWorkResult();

			expect(work.result).toBe(true);
		});

		/*Testa se o método execute da classe Builder está sendo chamado*/
		it('Test if execute method is called', function(){
			service.runValidations();

			var work = service.getWorkResult();

			expect(service.execute).toBeDefined();
		});

		xit('Test if method addOption return newOption', function() {

		});
	});

    function mockMetadataAnswerFactory($injector) {
    	Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
    	return Mock.MetadataAnswerFactory;
    }

    /*Mock build work factory service*/
    function mockEditorEngineService($injector) {
    	return Mock.WorkspaceService;
    }
});
