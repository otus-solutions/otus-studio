describe('MetadataAnswerFactory', function() {
    var Mock = {},

        OID = 'OID';

    /* @BeforeScenario */
    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            factory = _$injector_.get('MetadataAnswerFactory', {
            	'LabelFactory': mockLabelFactory(_$injector_)
            });  
        });
    });

    describe('MetadataAnswer', function() {

    	/*Scenario extends*/
        it('returned object should extends Question', function() {
            var option = factory.create(OID, '1234');

            expect(option.extends).toBe('StudioObject');
        });

        /*Scenario objectType*/
        it('returned object should have objectType equal to MetadataAnswer', function() {
        	var option = factory.create(OID, '1234');

        	expect(option.objectType).toBe('MetadataAnswer');
        });

        /*Scenario oid*/
        it('returned object should have a not null oid', function() {
        	var option = factory.create(OID, '1234');

        	expect(option.oid).toBe(OID);
        });

        /*Scenario dataType*/
        it('returned object should have dataType equal to Integer', function(){
        	var option = factory.create(OID, '1234');

        	expect(option.dataType).toBe('Integer');
        });


		/*Scenario parentQuestion*/
        it('returned object should have parentQuestion equal to Question.oid', function() {
            var option = factory.create(OID, '1234');

            expect(option.parentQuestion).toBe('1234');
        });

        /*Scenario label*/
        it('returned object should have a label object for ptBR', function(){
        	var option = factory.create(OID, '1234');

        	expect(option.label.ptBR).not.toBeNull();
        	expect(option.label.ptBR).not.toBeUndefined();
        });

        it('returned object should have a label object for ptBR', function(){
        	var option = factory.create(OID, '1234');

        	expect(option.label.ptBR).not.toBeNull();
        	expect(option.label.ptBR).not.toBeUndefined();
        });

        /*Scenario value*/
        it('call LabelFactory.create()', function() {
        	spyOn(Mock.LabelFactory, 'create');
        	
        	factory.create(OID, '1234');

        	expect(Mock.LabelFactory.create.calls.count()).toEqual(3);
        });

	});

	function mockLabelFactory($injector) {
		Mock.LabelFactory = $injector.get('LabelFactory');
		return Mock.LabelFactory;
	}


});