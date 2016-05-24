describe('OtusInputTextWidgetFactory', function() {
    var factory;
    var widget;
    var Mock = {};

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('OtusInputTextWidgetFactory');
        });

        mockElement();

        widget = factory.create({}, {}, Mock.element, {});
    });

    describe('create method', function() {

        it('should return an instance of OtusInputTextWidget', function() {
            expect(widget.className).toBe('OtusInputTextWidget');
        });

        it('should return a widget with css property defined', function() {
            expect(widget.css).toBeDefined();
        });

        it('should return a widget with template property defined', function() {
            expect(widget.template).toBeDefined();
        });

        it('should return a widget with parent property defined', function() {
            expect(widget.parent).toBeDefined();
        });

        it('should return a widget with event property defined', function() {
            expect(widget.event).toBeDefined();
        });

    });

    function mockElement() {
        Mock.element = {
            on: function on(eventName, callback) {
                callback();
            }
        };
    }

});
