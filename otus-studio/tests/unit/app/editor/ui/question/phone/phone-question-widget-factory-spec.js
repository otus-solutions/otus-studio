describe('PhoneQuestionWidgetFactory', function functionName() {
    var phoneQuestionWidgetFactory;
    var phoneQuestionWidget;

    beforeEach(function() {
        phoneQuestionWidgetFactory = jasmine.createSpyObj('phoneQuestionWidgetFactory', ['create']);
        phoneQuestionWidgetFactory.create();
        phoneQuestionWidget = jasmine.createSpy('phoneQuestionWidget');
        phoneQuestionWidget();
    });

    describe('group of test for PhoneQuestionWidgetFactory method', function functionName() {
        it("create spies for each requested function", function() {
            expect(phoneQuestionWidgetFactory.create).toBeDefined();
        });
        it('should call method create', function functionName() {
            expect(phoneQuestionWidgetFactory.create).toHaveBeenCalled();
        });
    });

    describe('group does test for PhoneQuestionWidget method', function functionName() {
        xit('should construct object correct', function functionName() {
            expect(phoneQuestionWidget.name).toEqual('PhoneQuestion');
        });
    });

});
