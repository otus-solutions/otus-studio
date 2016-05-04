describe('TimeQuestionFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);

            factory = _$injector_.get('TimeQuestionFactory');
        });
    });

    describe('TimeQuestion', function() {

        xit('returned object should extends Question', function() {
            var question = factory.create(Mock.TEMPLATE_ID, Mock.Question);

            expect(question.extents).toBe('Question');
        });

        it('returned object should have objectType equal to TimeQuestion', function() {
            var question = factory.create(Mock.TEMPLATE_ID, Mock.Question);

            expect(question.objectType).toBe('TimeQuestion');
        });

        it('returned object should have a not null oid', function() {
            var question = factory.create(Mock.TEMPLATE_ID, Mock.Question);

            expect(question.templateID).toBe(Mock.TEMPLATE_ID);
        });

        it('returned object should have dataType equal to LocalTime', function() {
            var question = factory.create(Mock.TEMPLATE_ID, Mock.Question);

            expect(question.dataType).toBe('LocalTime');
        });

        it('returned object should have a label object for ptBR locale', function() {
            var question = factory.create(Mock.TEMPLATE_ID, Mock.Question);

            expect(question.label.ptBR).not.toBeNull();
            expect(question.label.ptBR).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            var question = factory.create(Mock.TEMPLATE_ID, Mock.Question);

            expect(question.label.enUS).not.toBeNull();
            expect(question.label.enUS).not.toBeUndefined();
        });

        it('returned object should have a label object for enUS locale', function() {
            var question = factory.create(Mock.TEMPLATE_ID, Mock.Question);

            expect(question.label.esES).not.toBeNull();
            expect(question.label.esES).not.toBeUndefined();
        });

    });

    function mockQuestion($injector) {
        Mock.TEMPLATE_ID = 'TPL_ID';
        Mock.Question = $injector.get('QuestionFactory').create('TimeQuestion', Mock.TEMPLATE_ID);
    }

});
