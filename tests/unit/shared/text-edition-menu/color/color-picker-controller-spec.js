describe('color-picker-controller', function() {
    var mocks = {};
    var controller;

    beforeEach(function() {
        module('studio');

        inject(function(_$controller_, _$injector_) {
            controller = _$controller_('otus.textEdition.ColorController', {
                ColorContext: mock('otus.textEdition.ColorContext', 'ColorContext', _$injector_),
                $mdDialog: mock('$mdDialog', '$mdDialog', _$injector_),
            });
        });
    });

    it('should init values using current in context', function() {
        expect(mocks.ColorContext.backgroundColor).toEqual(controller.currentBackgroundColor);
        expect(mocks.ColorContext.textColor).toEqual(controller.currentTextColor);
    });

    it('should override context value when select', function() {
        controller.currentBackgroundColor = '#f000';
        controller.currentTextColor = '#f111';
        spyOn(mocks.$mdDialog, 'hide');

        controller.select();

        expect(mocks.ColorContext.backgroundColor).toEqual(controller.currentBackgroundColor);
        expect(mocks.ColorContext.textColor).toEqual(controller.currentTextColor);
        expect(mocks.$mdDialog.hide).toHaveBeenCalled();
    });

    it('should close dialog when call cancel', function() {
        spyOn(mocks.$mdDialog, 'cancel');

        controller.cancel();

        expect(mocks.$mdDialog.cancel).toHaveBeenCalled();
    });

    function mock(mockName, alias, $injector) {
        var factory = $injector.get(mockName);
        mocks[alias] = factory;

        return factory;
    }

});
