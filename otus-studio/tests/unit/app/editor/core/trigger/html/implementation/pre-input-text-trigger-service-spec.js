describe('PreInputTextTriggerService', function() {
    var editingSource = {
        component: {}
    };
    var mocks = {};
    var jqElement = {
        on: function(string, call) {}
    };

    beforeEach(function() {
        module('otusjs');
        module('studio');

        inject(function(_$injector_) {
            service = _$injector_.get('PreInputTextTriggerService', {
                EventService: mock('EventService', _$injector_)
            });
        });
    });

    it('should be created trigger with correct identifiers', function() {
        spyOn(mocks.EventService, 'performEvent');
        spyOn(angular, 'element').and.returnValue(jqElement);
        spyOn(jqElement, 'on');

        PreAddButtonTrigger = service.getTrigger(editingSource);

        expect(PreAddButtonTrigger.name).toEqual('PreInputTextTrigger');
        expect(PreAddButtonTrigger.tree).toEqual('html');
        expect(PreAddButtonTrigger.editingSource).toEqual(editingSource);
        expect(jqElement.on).toHaveBeenCalledWith('blur', jasmine.any(Function));
        expect(service.getSourceComponentType()).toEqual('pre-input-text');
    });

    function mock(mockName, $injector) {
        var factory = $injector.get(mockName);
        mocks[mockName] = factory;

        return factory;
    }
});
