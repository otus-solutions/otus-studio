describe('MetadataBuilderService', function(){
	var Mock = {};
	var work = 'work';
	var NEW_OPTION = 'NEW_OPTION';
	
	var OID = 'OID';
	var QUESTION_OID;

	beforeEach(function() {
		module('otusjs');

		inject(function(_$injector_) {
			service = _$injector_.get('MetadataAnswerBuilderService', {
				MetadataAnswerFactory : mockMetadataAnswerFactory(_$injector_)
				
			});
		});

		//MetadataAnswerFactory = MetadataAnswerFactory.create(OID, QUESTION_OID);

	});

	describe('Part of code manage test scenario', function() {

		it('Test if variable work returned true', function() {
			service.runValidations();

			var work = service.getWorkResult();

			expect(work.result).toBe(true);
		});

		/*Testa se o método execute da classe Builder está sendo chamado*/
		it('Test if execute it is called', function(){
			service.runValidations();

			var work = service.getWorkResult();

			expect(service.execute).toBeDefined();
		});

		it('Test if method addOption return newOption', function() {
			/*service.runValidations();

			var work = service.getWorkResult();

			var NEW_OPTION = Mock.MetadataAnswerFactory.create(); //create(oid, questionOID)

			spyOn(Mock.MetadataAnswerFactory, 'create');
			service.addOption(work);

			expect(Mock.WorkspaceService).toHaveBeenCalled();*/

		});
	});
	
    function mockMetadataAnswerFactory($injector) {
    	Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
    	return Mock.MetadataAnswerFactory;
    }

    /*Mock workspace service*/
    function mockWorkspaceService($injector) {
    	Mock.WorkspaceService = $injector.get('WorkspaceService');
    	return Mock.WorkspaceService;
    }
});