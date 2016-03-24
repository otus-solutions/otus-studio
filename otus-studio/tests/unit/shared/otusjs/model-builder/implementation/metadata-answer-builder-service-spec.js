describe('MetadataBuilderService', function(){
	var Mock = {};
	var work = 'work';
	var nextOID = 'nextOID';

	beforeEach(function() {
		module('otusjs');

		inject(function(_$injector_) {
			service = _$injector_.get('MetadataAnswerBuilderService', {
				MetadataAnswerFactory : mockMetadataAnswerFactory(_$injector_),
				BuildWorkFactory : mockBuildWorkFactory(_$injector_)
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

		it('Test if method addOption return newOption', function() {
			var selectedQuestion;
			var target = Mock.BuildWorkFactory.BuildWork.target;

			selectedQuestion = target;
			service.runValidations();

			var work = service.getWorkResult();

			var newOption = Mock.MetadataAnswerFactory.create(nextOID , selectedQuestion);
			
			//console.log(newOption); 

		});
	});

    function mockMetadataAnswerFactory($injector) {
    	Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
    	return Mock.MetadataAnswerFactory;
    }

    /*Mock build work factory service*/
    function mockBuildWorkFactory($injector) {
    	Mock.BuildWorkFactory = $injector.get('BuildWorkFactory');

    	Mock.BuildWorkFactory.BuildWork = {
    		BuildWork : {
    			'survey' : Mock.survey,
    			'data' : Mock.data,
    			'type' : Mock.type,
    			'target' : Mock.target
    		}
    	}

    	return Mock.BuildWorkFactory;
    }
});
