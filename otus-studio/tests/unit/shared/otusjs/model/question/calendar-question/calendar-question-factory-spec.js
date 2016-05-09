describe('CalendarQuestionFactory', function() {
    var Mock = {};
    var question;

    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);

            factory = _$injector_.get('CalendarQuestionFactory');
        });

        question = factory.create(Mock.TEMPLATE_ID, Mock.Question);
    });

    describe('CalendarQuestion', function() {

        xit('returned object should extends Question', function() {
            expect(question.extends).toBe('Question');
        });

        it('returned object should have objectType equal to CalendarQuestion', function() {
            expect(question.objectType).toBe('CalendarQuestion');
        });

        it('returned object should have a not null templateID', function() {
            expect(question.templateID).toBe(Mock.TEMPLATE_ID);
        });

        it('returned object should have dataType equal to LocalDate', function() {
            expect(question.dataType).toBe('LocalDate');
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
        Mock.Question = $injector.get('QuestionFactory').create('CalendarQuestion', Mock.TEMPLATE_ID);
    }

});
