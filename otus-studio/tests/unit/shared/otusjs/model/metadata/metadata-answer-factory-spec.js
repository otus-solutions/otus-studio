describe('MetadataAnswerFactory', function() {
    var Mock = {};
    var option;

    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            factory = _$injector_.get('MetadataAnswerFactory', {
                'LabelFactory': mockLabelFactory(_$injector_)
            });

            option = factory.create('1234');
        });
    });

    describe('MetadataAnswer', function() {

        it('returned object should extends Question', function() {
            expect(option.extends).toBe('StudioObject');
        });

        it('returned object should have objectType equal to MetadataAnswer', function() {
            expect(option.objectType).toBe('MetadataAnswer');
        });

        it('returned object should have dataType equal to Integer', function() {
            expect(option.dataType).toBe('Integer');
        });

        xit('returned object should have parentQuestion equal to Question.oid', function() {
            expect(option.parentQuestion).toBe('1234');
        });

        it('returned object should have a label object for ptBR', function() {
            expect(option.label.ptBR).not.toBeNull();
            expect(option.label.ptBR).not.toBeUndefined();
        });

        it('returned object should have a label object for ptBR', function() {
            expect(option.label.ptBR).not.toBeNull();
            expect(option.label.ptBR).not.toBeUndefined();
        });

        xit('call LabelFactory.create()', function() {
            spyOn(Mock.LabelFactory, 'create');

            factory.create('1234');

            expect(Mock.LabelFactory.create.calls.count()).toEqual(3);
        });

    });

    function mockLabelFactory($injector) {
        Mock.LabelFactory = $injector.get('LabelFactory');
        return Mock.LabelFactory;
    }

});
