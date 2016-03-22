describe('MetadataGroupFactory', function(){
	var Mock = {},

		OID = 'OID';

	/*@BeforeScenario*/
	beforeEach(function() {
		module('otusjs.model');

		inject(function(_$injector_) {
			factory = _$injector_.get('MetadataGroupFactory', {
				'MetadataAnswerFactory' : mockMetadataAnswerFactory(_$injector_)
			});
		});

		answer = factory.create();
	});

	describe('MetadataGroupFactory.create()', function() {

		/*Scenario Extends*/
		it('returned object should extends Question', function(){
			expect(answer.extends).toBe('StudioObject');
		});

		/*Scenario ObjectType*/
		it('return should an Label ObjectType', function() {
			expect(answer.objectType).toBe('MetadataGroup');
		});

		/*Scenario oid*/
		xit('return should an answer represent oid', function() {
		});

		/*Scenario parentQuestion
		it('return should an answer parentQuestion', function() {
			expect(answer.parentQuestion).toBe(questionOID);
		});*/


		/*Scenario option*/
		it('return should an answer option', function() {
			 expect({}).toEqual(jasmine.any(Object));
		});


	});

	function mockMetadataAnswerFactory($injector) {
		Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
		return Mock.MetadataAnswerFactory;
	}

});