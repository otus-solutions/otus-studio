describe('MetadataBuilderService', function(){
	var Mock = {};

	beforeEach(function() {
		module('otusjs.modelBuilder');

		inject(function(_$injector_) {
			service = _$injector_.get('MetadataAnswerBuilderService', {
				MetadataAnswerFactory : MockMetadataAnswerFactory(_$injector_)
			});
		});

	});

	describe('method getWorkResult', function() {
		
	});

	/*describe('method execute', function(){

	});*/

    function mockMetadataAnswerFactory($injector) {
    	Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
    	return Mock.MetadataAnswerFactory;
    }

});