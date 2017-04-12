describe('AnswerOptionWidgetFactory', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('AnswerOptionWidgetFactory');
        });
    });

    describe('create method', function() {

        var widget;

        beforeEach(function() {
            widget = factory.create(Mock.scope);
        });

        describe('Interface definition', function() {

            it('should create an object with getClassName method defined', function() {
                expect(widget.name).toEqual('AnswerOption');
                expect(widget.name).toBeDefined();
            });
        });
    });
});
