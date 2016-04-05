describe('PreAddButtonTriggerService', function() {
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
            service = _$injector_.get('PreAddButtonTriggerService', {
                EventService: mock('EventService', _$injector_)
            });
        });
    });

    it('should be created trigger with correct identifiers', function() {
        spyOn(mocks.EventService, 'performEvent');
        spyOn(angular, 'element').and.returnValue(jqElement);
        spyOn(jqElement, 'on');

        PreAddButtonTrigger = service.getTrigger(editingSource);

        expect(PreAddButtonTrigger.name).toEqual('PreAddButtonTrigger');
        expect(PreAddButtonTrigger.tree).toEqual('html');
        expect(PreAddButtonTrigger.editingSource).toEqual(editingSource);
        expect(jqElement.on).toHaveBeenCalledWith('click', jasmine.any(Function));
        expect(service.getSourceComponentType()).toEqual('pre-add-button');
    });

    function mock(mockName, $injector) {
        var factory = $injector.get(mockName);
        mocks[mockName] = factory;

        return factory;
    }

});
