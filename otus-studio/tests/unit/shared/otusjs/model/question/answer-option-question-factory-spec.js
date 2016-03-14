describe('AnswerOptionFactory', function() {
    var Mock = {},

        OID = 'OID';

    /* @BeforeScenario */
    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            /* @Mock */
            mockQuestion(_$injector_);

            factory = _$injector_.get('AnswerOptionFactory');
        });
    });

    describe('AnswerOption', function() {

        it('returned object should extends Question', function() {
            var option = factory.create(OID, Mock.Question.oid);

            expect(option.extends).toBe('StudioObject');
        });

        it('returned object should have objectType equal to QuestionAnswerOption', function() {
            var option = factory.create(OID, Mock.Question.oid);

            expect(option.objectType).toBe('QuestionAnswerOption');
        });

        it('returned object should have a not null oid', function() {
            var option = factory.create(OID, Mock.Question.oid);

            expect(option.oid).toBe(OID);
        });

        it('returned object should have dataType equal to Integer', function() {
            var option = factory.create(OID, Mock.Question.oid);

            expect(option.dataType).toBe('Integer');
        });

        it('returned object should have parentQuestion equal to Question.oid', function() {
            var option = factory.create(OID, Mock.Question.oid);

            expect(option.parentQuestion).toBe(Mock.Question.oid);
        });

        it('returned object should have a label object for ptBR locale', function() {
            var option = factory.create(OID, Mock.Question.oid);

            expect(option.label.ptBR).not.toBeNull();
            expect(option.label.ptBR).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            var option = factory.create(OID, Mock.Question.oid);

            expect(option.label.enUS).not.toBeNull();
            expect(option.label.enUS).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            var option = factory.create(OID, Mock.Question.oid);

            expect(option.label.esES).not.toBeNull();
            expect(option.label.esES).not.toBeUndefined();
        });

    });

    function mockQuestion($injector) {
        Mock.Question = $injector.get('QuestionFactory').create('single-selection-question', OID);
    }

});
