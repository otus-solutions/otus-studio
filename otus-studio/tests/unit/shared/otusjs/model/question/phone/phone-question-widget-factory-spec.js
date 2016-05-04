describe('PhoneQuestionWidgetFactory', function functionName() {
    var phoneQuestionWidgetFactory;
    var phoneQuestionWidget;
    var phone;

    beforeEach(function() {
        phoneQuestionWidgetFactory = jasmine.createSpyObj('phoneQuestionWidgetFactory', ['create']);
        phone = phoneQuestionWidgetFactory.create();
        // phoneQuestionWidget = jasmine.createSpy('phoneQuestionWidget');
        // phone = new phoneQuestionWidget();
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
            expect(phone.name).toEqual('PhoneQuestion');
        });
    });

});
