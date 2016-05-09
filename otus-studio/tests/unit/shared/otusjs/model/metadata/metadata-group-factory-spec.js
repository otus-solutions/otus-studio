describe('MetadataGroupFactory', function() {
    var Mock = {};
    var NAME = 'NAME';
    var QUESTION_ID = 'QUESTION_ID';

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

        it('returned object should extends Question', function() {
            expect(metadataGroup.extents).toBe('StudioObject');
        });

        it('return should an Label ObjectType', function() {
            expect(metadataGroup.objectType).toBe('MetadataGroup');
        });

        it('return should an metadataGroup represent name', function() {
            expect(metadataGroup.name).toBe(NAME);
        });

        it('return should an metadataGroup parentQuestion', function() {
            expect(metadataGroup.parentQuestion).toBe(QUESTION_ID);
        });

        it('return should an metadataGroup option', function() {
            expect(metadataGroup.option).toEqual(jasmine.any(Object));
        });
    });

    function mockMetadataAnswerFactory($injector) {
        Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
        return Mock.MetadataAnswerFactory;
    }

});
