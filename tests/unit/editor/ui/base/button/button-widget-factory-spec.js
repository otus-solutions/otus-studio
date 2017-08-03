xdescribe('OtusButtonWidgetFactory', function() {
    var factory;
    var widget;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('OtusButtonWidgetFactory');
        });

        widget = factory.create({}, {}, {});
    });

    describe('create method', function() {

        it('should return an instance of OtusButtonWidget', function() {
            expect(widget.className).toBe('OtusButtonWidget');
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

});
