describe('SingleSelectionQuestionFactory', function() {
    var Mock = {};
    var question;

    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);

            factory = _$injector_.get('SingleSelectionQuestionFactory');
        });

        question = factory.create(Mock.TEMPLATE_ID, Mock.Question);
    });

    describe('SingleSelectionQuestion', function() {

        xit('returned object should extends Question', function() {
            expect(question.extends).toBe('Question');
        });

        it('returned object should have objectType equal to SingleSelectionQuestion', function() {
            expect(question.objectType).toBe('SingleSelectionQuestion');
        });

        it('returned object should have a not null templateID', function() {
            expect(question.templateID).toBe(Mock.TEMPLATE_ID);
        });

        it('returned object should have dataType equal to Integer', function() {
            expect(question.dataType).toBe('Integer');
        });

        it('returned object should have a label object for ptBR locale', function() {
            expect(question.label.ptBR).not.toBeNull();
            expect(question.label.ptBR).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            expect(question.label.enUS).not.toBeNull();
            expect(question.label.enUS).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            expect(question.label.esES).not.toBeNull();
            expect(question.label.esES).not.toBeUndefined();
        });

    });

    function mockQuestion($injector) {
        Mock.TEMPLATE_ID = 'TPL_ID';
        Mock.Question = $injector.get('QuestionFactory').create('SingleSelectionQuestion', Mock.TEMPLATE_ID);
    }

});
