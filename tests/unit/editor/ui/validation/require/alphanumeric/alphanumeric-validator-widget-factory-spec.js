describe('AlphanumericValidatorWidgetFactory', function() {
    var Mock = {};
    var factory;
    var widget;

    beforeEach(function() {
        module('studio');

        mockElement();

        inject(function(_$injector_) {
            // mockWidgetScope(_$injector_);
            factory = _$injector_.get('AlphanumericValidatorWidgetFactory');
        });

        widget = factory.create(Mock.scope, Mock.element);
    });

    describe('create method', function() {

        describe('Interface definition', function() {
            xit('should create an object with data defined', function() {
                console.log(widget.data);
                // expect(widget.data).toBe(true);
            });
        });
    });

    function mockElement() {
        Mock.element = {};
    }


});
