describe('MetadataGroupFactory', function() {
    var Mock = {},
        NAME = 'NAME',
        QUESTION_ID = 'QUESTION_ID';

    /*@BeforeScenario*/
    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            factory = _$injector_.get('MetadataGroupFactory', {
                'MetadataAnswerFactory': mockMetadataAnswerFactory(_$injector_)
            });
        });

        metadataGroup = factory.create(NAME, QUESTION_ID);
    });

    describe('MetadataGroupFactory.create()', function() {

        it('should returned an object defined', function() {
            expect(metadataGroup).toBeDefined();
        });

        /*Scenario Extends*/
        it('returned object should extends Question', function() {
            expect(metadataGroup.extends).toBe('StudioObject');
        });

        /*Scenario ObjectType*/
        it('return should an Label ObjectType', function() {
            expect(metadataGroup.objectType).toBe('MetadataGroup');
        });

        /*Scenario oid*/
        it('return should an metadataGroup represent name', function() {
            expect(metadataGroup.name).toBe(NAME);
        });

        //Scenario parentQuestion
        it('return should an metadataGroup parentQuestion', function() {
            expect(metadataGroup.parentQuestion).toBe(QUESTION_ID);
        });

        /*Scenario option*/
        it('return should an metadataGroup option', function() {
            expect(metadataGroup.option).toEqual(jasmine.any(Object));
        });
    });

    function mockMetadataAnswerFactory($injector) {
        Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
        return Mock.MetadataAnswerFactory;
    }

});
