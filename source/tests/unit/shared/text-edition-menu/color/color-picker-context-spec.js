describe('color-picker-context', function() {
    var service;

    beforeEach(function() {
        angular.mock.module('studio');

        inject(function(_$injector_) {
            service = _$injector_.get('otus.textEdition.ColorContext');
        });
    });

    it('should init with corrects values', function() {
        expect('#448aff').toEqual(service.backgroundColor);
        expect('#737373').toEqual(service.textColor);
    });

});
