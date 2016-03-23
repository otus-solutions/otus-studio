describe('MetadataBuilderService', function(){
	var Mock = {};
	var NEW_OPTION = 'NEW_OPTION';
	var work = 'work'

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

		it('Test if execute to be called', function(){
			service.runValidations();

			var work = service.getWorkResult();

			expect(service.execute).toBeDefined();
		});

		it('Test if method addOption return newOption', function() {
			service.runValidations();

		});

		/*it('Test if method removeOption remove', function(){

		});

		it('Test if method updateOption to update', function() {

		});*/
	});
	

    function mockMetadataAnswerFactory($injector) {
    	Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
    	return Mock.MetadataAnswerFactory;
    }

});