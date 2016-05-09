describe('AnswerOptionFactory', function() {
    var Mock = {};
    var option;

    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);

            factory = _$injector_.get('AnswerOptionFactory');
        });

        option = factory.create(Mock.TEMPLATE_ID, Mock.Question.oid);
    });

    describe('AnswerOption', function() {

        it('returned object should extends StudioObject', function() {
            expect(option.extents).toBe('StudioObject');
        });

        it('returned object should have objectType equal to AnswerOption', function() {
            expect(option.objectType).toBe('AnswerOption');
        });

        it('returned object should have a not null value', function() {
            expect(option.value).toBe(Mock.TEMPLATE_ID);
        });

        it('returned object should have dataType equal to Integer', function() {
            expect(option.dataType).toBe('Integer');
        });

        it('returned object should have parentQuestion equal to Question.oid', function() {
            expect(option.parentQuestionID).toBe(Mock.Question.oid);
        });

        it('returned object should have a label object for ptBR locale', function() {
            expect(option.label.ptBR).not.toBeNull();
            expect(option.label.ptBR).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            expect(option.label.enUS).not.toBeNull();
            expect(option.label.enUS).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            expect(option.label.esES).not.toBeNull();
            expect(option.label.esES).not.toBeUndefined();
        });

    });

    function mockQuestion($injector) {
        Mock.TEMPLATE_ID = 'TPL_ID';
        Mock.Question = $injector.get('QuestionFactory').create('SingleSelectionQuestion', Mock.TEMPLATE_ID);
    }

});
